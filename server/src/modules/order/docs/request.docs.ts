import { DRecipient } from '@modules/order/docs/recipient.docs';
import { DocsClass } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { DPayment } from '@modules/order/docs/payment.docs';
import { DPricesOrder } from '@modules/order/docs/order.docs';
import { DDelivery } from '@modules/order/docs/delivery.docs';
import { DCart } from '@modules/cart/docs';

export class RequestOrder extends DPricesOrder {
  @DocsClass(
    DRecipient,
    'firstName',
    'lastName',
    'middleName',
    'email',
    'phone',
  )
  recipient: Omit<DRecipient, 'id'>;

  @DocsClass(
    [DCart],
    'price',
    'count',
    'priceWithDiscount',
    'priceDiscount',
    'product',
    'productPrice',
    'productDiscount',
  )
  products: any;

  @ApiProperty({ type: [DPayment] })
  payments: DPayment[];

  @ApiProperty({ type: [DDelivery] })
  deliveries: DDelivery[];
}
