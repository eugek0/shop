import {
  DataType,
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { MOrderStatus } from '@modules/order/models/order-status.model';
import { MOrder } from '@modules/order/models/order.model';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MOrderHistoryStatus extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: ID;

  @ForeignKey(() => MOrder)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  orderId: ID;

  @BelongsTo(() => MOrder)
  order: MOrder;

  @ForeignKey(() => MOrderStatus)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  statusId: ID;

  @BelongsTo(() => MOrderStatus)
  status: MOrderStatus;
}
