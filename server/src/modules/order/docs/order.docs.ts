import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DocsClass } from '@common/decorators';

import { DOrderProduct } from '@modules/order/docs/order-product.docs';
import { DOrderStatus } from '@modules/order/docs/order-status.docs';
import { DRecipient } from '@modules/order/docs/recipient.docs';
import { DDelivery } from '@modules/order/docs/delivery.docs';
import { DPayment } from '@modules/order/docs/payment.docs';

import { ID } from '@common/types';
import { DOrderHistoryStatus } from '@modules/order/docs/order-history-status.docs';

export class DPricesOrder {
  @ApiProperty({ type: Number, example: 12000 })
  totalPrice: number;

  @ApiPropertyOptional({ type: Number, example: 1500 })
  totalPriceDiscount: number | null;

  @ApiPropertyOptional({ type: Number, example: 10500 })
  totalPriceWithDiscount: number | null;
}

export class DOrder extends DPricesOrder {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @DocsClass(DOrderStatus)
  status: DOrderStatus;

  @DocsClass(DDelivery)
  delivery: DDelivery;

  @DocsClass(DPayment)
  payment: DPayment;

  @DocsClass(DRecipient)
  recipient: DRecipient;

  @ApiProperty({ type: [DOrderProduct] })
  products: DOrderProduct[];

  @ApiProperty({ type: [DOrderHistoryStatus] })
  historyStatuses: DOrderHistoryStatus[];

  @ApiProperty({
    type: String,
    example: '2023-06-08T18:35:06.044Z',
    description: 'Дата создания заказа',
  })
  createdAt: string;
}
