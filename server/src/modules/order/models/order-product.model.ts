import {
  ForeignKey,
  BelongsTo,
  DataType,
  Column,
  Table,
  Model,
} from 'sequelize-typescript';

import { MOrder } from '@modules/order/models/order.model';
import { MProduct } from '@modules/product/models';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MOrderProduct extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: ID;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  priceWithDiscount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  priceDiscount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  count: number;

  @ForeignKey(() => MProduct)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId: ID;

  @BelongsTo(() => MProduct)
  product: MProduct;

  @ForeignKey(() => MOrder)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  orderId: ID;

  @BelongsTo(() => MOrder)
  order: MOrder;
}
