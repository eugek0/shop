import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

import { ErrorService } from '@common/errors';

import { MProduct } from '@modules/product/models';
import { MCart } from '@modules/cart/models';
import { MUser } from '@modules/user/models';
import {
  MDelivery,
  MOrder,
  MOrderProduct,
  MOrderStatus,
  MPayment,
  MRecipient,
} from '@modules/order/models';

import { CreateOrder, Recipient } from '@modules/order/dto';

import { OrderStatus } from '@modules/order/enum/status.enum';

import {
  getRecipientByUser,
  getProductsInCart,
  getOrderStatus,
  getDelivery,
  getPayment,
  getOrders,
} from '@modules/order/query';

import {
  DOrderStatus,
  DPricesOrder,
  DRecipient,
  DDelivery,
  DPayment,
  DOrder,
} from '@modules/order/docs';

import { ID } from '@common/types';
import { MailService } from '@modules/mail/services';
import { messageOrder } from '@common/utils';
import { SUBJECT } from '@common/constants';

@Injectable()
export class OrderService extends ErrorService {
  constructor(
    @InjectModel(MOrderProduct) private orderProduct: typeof MOrderProduct,
    @InjectModel(MOrderStatus) private status: typeof MOrderStatus,
    @InjectModel(MRecipient) private recipient: typeof MRecipient,
    @InjectModel(MDelivery) private delivery: typeof MDelivery,
    @InjectModel(MPayment) private payment: typeof MPayment,
    @InjectModel(MProduct) private product: typeof MProduct,
    @InjectModel(MOrder) private order: typeof MOrder,
    @InjectModel(MCart) private cart: typeof MCart,
    @InjectModel(MUser) private user: typeof MUser,
    private readonly mail: MailService,
  ) {
    super();
  }

  public async request(userId: ID): Promise<any> {
    const products = await this.getProducts(userId, ['userId', 'productId']);
    const recipient = await this.getRecipientInfoByUser(userId);
    const totalPrices = this.getTotalPricesByProducts(products);
    const deliveries = await this.getDeliveries();
    const payments = await this.getPayments();

    return {
      recipient,
      products,
      deliveries,
      payments,
      ...totalPrices,
    };
  }

  public async create(
    { paymentId, deliveryId, recipient }: CreateOrder,
    userId: ID,
  ): Promise<any> {
    const { id: recipientId } = await this.createRecipient(recipient);
    const { id: statusId } = await this.findStatus(OrderStatus.created);
    const products = await this.getProducts(userId);

    const totalPrices = this.getTotalPricesByProducts(products);

    const { id: orderId } = await this.order.create({
      paymentId,
      deliveryId,
      userId,
      statusId,
      recipientId,
      ...totalPrices,
    });

    await this.orderProduct.bulkCreate(
      products.map((orderProduct) => ({ ...orderProduct, orderId })),
    );

    await this.decrementQuantity(products, userId);

    await this.mailOrder(userId, orderId);

    return this.getOrders(userId);
  }

  private async mailOrder(userId: ID, orderId: ID): Promise<void> {
    const order = await this.getOrder(userId, orderId);
    const { email, firstName, lastName } = await this.getRecipientInfoByUser(
      userId,
    );
    const isUniqueEmail = email !== order.recipient.email;

    const emails = isUniqueEmail ? [email, order.recipient.email] : [email];
    const name = `${firstName} ${lastName}`;
    const message = messageOrder(name, order);

    return this.mail.send(emails, message, SUBJECT.ORDER);
  }

  private async getProducts(
    userId: ID,
    exclude: string[] = [],
  ): Promise<MCart[]> {
    const options = getProductsInCart(userId, exclude);

    const products = await this.cart.findAll(options);

    if (!products.length) this.badRequest('order.cart_empty');

    return products.map((orderProduct) => orderProduct.toJSON());
  }

  public async createRecipient(recipient: Recipient) {
    return this.recipient.create({ ...recipient });
  }

  public async getOrders(userId: ID): Promise<DOrder[]> {
    const options = getOrders(userId);

    return this.order.findAll<any>(options);
  }

  public async getOrder(userId: ID, id: ID): Promise<DOrder> {
    const options = getOrders(userId, id);
    const candidate = await this.order.findOne<any>(options);

    if (!candidate) this.notFound('order.not_found');

    return candidate;
  }

  public async getDeliveries(): Promise<DDelivery[]> {
    const options = getDelivery();

    return this.delivery.findAll(options);
  }

  public async getPayments(): Promise<DPayment[]> {
    const options = getPayment();

    return this.payment.findAll(options);
  }

  public async getStatuses(): Promise<DOrderStatus[]> {
    const options = getOrderStatus();

    return this.status.findAll(options);
  }

  private async findStatus(value: OrderStatus): Promise<MOrderStatus> {
    const candidate = await this.status.findOne({ where: { value } });

    if (!candidate) this.badRequest('validation.CRITICAL_ERROR');

    return candidate;
  }

  private async getRecipientInfoByUser(
    userId: ID,
  ): Promise<Omit<DRecipient, 'id'> | null> {
    const options = getRecipientByUser(userId);

    const candidate = await this.user.findOne(options);

    if (!candidate) this.notFound('user.not_found');

    return candidate;
  }

  private async decrementQuantity(products: any, userId: ID): Promise<void> {
    for (const {
      count,
      productId,
      product: { id },
    } of products) {
      await this.product.decrement('quantity', { where: { id }, by: count });
      await this.cart.destroy({ where: { userId, productId } });
    }
  }

  private getTotalPricesByProducts(products: any[]): DPricesOrder {
    const initial = {
      totalPrice: 0,
      totalPriceDiscount: 0,
      totalPriceWithDiscount: 0,
    };

    return products.reduce((acc, orderProduct) => {
      const totalPrice = acc.totalPrice + orderProduct.price;
      const totalPriceDiscount =
        acc.totalPriceDiscount + orderProduct.priceDiscount || null;
      const productPriceWithDiscount =
        orderProduct.priceWithDiscount || orderProduct.price;
      const totalPriceWithDiscount =
        acc.totalPriceWithDiscount + productPriceWithDiscount;

      return {
        totalPrice,
        totalPriceDiscount,
        totalPriceWithDiscount,
      };
    }, initial);
  }
}
