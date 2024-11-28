import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ForeignKey,
  BelongsTo,
  DataType,
  HasMany,
  Column,
  Table,
  Model,
} from 'sequelize-typescript';

import { MPriceHistory } from '@modules/product/models';
import { MGender } from '@modules/gender/models';
import { MColor } from '@modules/color/models';
import { MType } from '@modules/type/models';
import { MReport } from '@modules/report/models';
import { MVolume } from '@modules/volume/models';

import { ID } from '@common/types';
import { MFavorite } from '@modules/favorite/models';
import { MMotive } from '@modules/motive/models/motive.model';
import { MDiscount } from '@modules/discount/models';
import { MCart } from '@modules/cart/models';

@Table({ paranoid: true })
export class MProduct extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({
    type: String,
    example: 'Charisme Sport',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Description',
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  description: null | string;

  @ApiProperty({
    example: [],
  })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  images: string[];

  @ApiProperty({
    type: Number,
    example: 4000,
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({
    type: Number,
    example: 30,
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @ForeignKey(() => MType)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  typeId: ID;

  @BelongsTo(() => MType)
  type: MType;

  @ForeignKey(() => MGender)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  genderId: ID;

  @BelongsTo(() => MGender)
  gender: MGender;

  @ForeignKey(() => MColor)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  colorId: ID;

  @BelongsTo(() => MColor)
  color: MColor;

  @ForeignKey(() => MVolume)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  volumeId: ID;

  @BelongsTo(() => MVolume)
  volume: MVolume;

  @ForeignKey(() => MMotive)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  motiveId: ID;

  @BelongsTo(() => MMotive)
  motive: MMotive;

  @ForeignKey(() => MDiscount)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  discountId: ID;

  @BelongsTo(() => MDiscount)
  discount: MDiscount;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const discount = this.getDataValue('discount');
      const price = this.getDataValue('price');

      if (!discount || !price) return null;

      return (discount.value / 100) * price;
    },
  })
  priceDiscount: number | null;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const discount = this.getDataValue('discount');
      const price = this.getDataValue('price');

      if (!discount) return null;

      return (1 - discount.value / 100) * price;
    },
  })
  priceWithDiscount: number | null;

  @HasMany(() => MPriceHistory)
  history: MPriceHistory[];

  @HasMany(() => MReport)
  reports: MReport[];

  @HasMany(() => MFavorite, { onDelete: 'CASCADE', hooks: true })
  favorites: MFavorite[];

  @HasMany(() => MCart, { onDelete: 'CASCADE', hooks: true })
  carts: MCart[];
}
