import {
  ForeignKey,
  BelongsTo,
  DataType,
  HasMany,
  Column,
  Table,
  Model,
} from 'sequelize-typescript';

import { MOrderStatus } from '@modules/order/models/order-status.model';
import { MRecipient } from '@modules/order/models/recipient.model';
import { MDelivery } from '@modules/order/models/delivery.model';
import { MPayment } from '@modules/order/models/payment.model';
import { MUser } from '@modules/user/models';

import { ID } from '@common/types';
import { MOrderProduct } from '@modules/order/models/order-product.model';
import { MOrderHistoryStatus } from '@modules/order/models/order-status-history.model';

@Table({ paranoid: true })
export class MOrder extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: ID;

  @ForeignKey(() => MUser)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: ID;

  @BelongsTo(() => MUser)
  user: MUser;

  @ForeignKey(() => MDelivery)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  deliveryId: ID;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  totalPriceWithDiscount: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  totalPriceDiscount: number | null;

  @BelongsTo(() => MDelivery)
  delivery: MDelivery;

  @ForeignKey(() => MPayment)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  paymentId: ID;

  @BelongsTo(() => MPayment)
  payment: MPayment;

  @ForeignKey(() => MOrderStatus)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  statusId: ID;

  @BelongsTo(() => MOrderStatus)
  status: MOrderStatus;

  @ForeignKey(() => MRecipient)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  recipientId: ID;

  @BelongsTo(() => MRecipient)
  recipient: MRecipient;

  @HasMany(() => MOrderProduct)
  products: MOrderProduct[];

  @HasMany(() => MOrderHistoryStatus)
  historyStatuses: MOrderHistoryStatus[];
}
