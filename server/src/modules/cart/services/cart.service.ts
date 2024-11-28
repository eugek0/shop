import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { HttpException, Injectable } from '@nestjs/common';

import { ErrorService } from '@common/errors';

import { ProductService } from '@modules/product/services';

import { MCart } from '@modules/cart/models';

import { AddProduct, ChangeCart } from '@modules/cart/dto';

import { getCartByUserId } from '@modules/cart/query';

import { ID, TSchema } from '@common/types';

import { DFullProduct } from '@modules/product/docs/product.docs';

@Injectable()
export class CartService extends ErrorService {
  constructor(
    private readonly configService: ConfigService<TSchema>,
    private readonly productService: ProductService,
    @InjectModel(MCart) private cart: typeof MCart,
  ) {
    super();
  }

  public async add(
    { productId }: AddProduct,
    userId: ID,
  ): Promise<DFullProduct> {
    const product = await this.productService.getById(productId);
    const count = 1;

    const {
      price: productPrice,
      quantity: maxCount,
      price,
      discount,
      priceWithDiscount,
      priceDiscount,
    } = product;

    const { value: productDiscount = null } = discount || {};

    const candidate = await this.findByProductId(productId, userId);

    if (candidate) this.exist;

    await this.cart.create({
      maxCount,
      priceDiscount,
      priceWithDiscount,
      productDiscount,
      productPrice,
      price,
      count,
      productId,
      userId,
    });

    return this.productService.getById(productId, userId);
  }

  public async change({ id, count }: ChangeCart, userId: ID): Promise<MCart[]> {
    if (count <= 0) this.minCount;

    const candidate = await this.findById(userId, id);

    if (!candidate) this.notFound('cart.not_found');

    this.checkOverLimit(count, candidate);
    await candidate.update({ count });

    return this.get(userId);
  }

  public async delete(id: ID, userId: ID): Promise<MCart[]> {
    await this.cart.destroy({ where: { id, userId } });

    return this.get(userId);
  }

  public async get(userId: ID): Promise<MCart[]> {
    return this.cart.findAll(getCartByUserId(userId));
  }

  private async findById(userId: ID, id?: ID): Promise<MCart | null> {
    return this.cart.findOne(getCartByUserId(userId, id));
  }

  private async findByProductId(
    productId: ID,
    userId: ID,
  ): Promise<MCart | null> {
    const options = getCartByUserId(userId);

    options.where['productId'] = productId;

    return this.cart.findOne(options);
  }

  private async validateProductId(productId: ID): Promise<void> {
    await this.productService.getById(productId);
  }

  private checkOverLimit(count: number, { maxCount }: MCart): void {
    if (count <= maxCount) return;

    this.badRequest('cart.limit', { maxCount });
  }

  private get minCount(): HttpException {
    throw this.badRequest('cart.minCount');
  }

  private get exist(): HttpException {
    throw this.badRequest('cart.exist');
  }
}
