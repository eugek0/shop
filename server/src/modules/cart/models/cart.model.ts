import {
  ForeignKey,
  BelongsTo,
  DataType,
  Column,
  Table,
  Model,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { MProduct } from '@modules/product/models';
import { MUser } from '@modules/user/models';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MCart extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({
    type: Number,
    example: 3,
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  count: number;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: false,
    get() {
      const { quantity = 0 } = this.getDataValue('product') || {};

      return quantity;
    },
  })
  maxCount: number;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const price = this.getDataValue('productPrice');
      const count = this.getDataValue('count') || 1;

      return count * price;
    },
  })
  price: number;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const productDiscount = this.getDataValue('productDiscount');
      const productPrice = this.getDataValue('productPrice');
      const count = this.getDataValue('count');

      if (!productDiscount || !productPrice) return null;

      return (productDiscount / 100) * productPrice * count;
    },
  })
  priceDiscount: number | null;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const productDiscount = this.getDataValue('productDiscount');
      const productPrice = this.getDataValue('productPrice');
      const count = this.getDataValue('count');

      if (!productDiscount) return null;

      return (1 - productDiscount / 100) * productPrice * count;
    },
  })
  priceWithDiscount: number | null;

  @Column({ type: DataType.INTEGER, allowNull: false })
  productPrice: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  productDiscount: number | null;

  @ForeignKey(() => MProduct)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  productId: ID;

  @ApiProperty({ type: () => MProduct })
  @BelongsTo(() => MProduct)
  product: MProduct;

  @ForeignKey(() => MUser)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  userId: ID;

  @BelongsTo(() => MUser)
  user: MUser;
}
