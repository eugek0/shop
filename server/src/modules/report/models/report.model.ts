import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ForeignKey,
  BelongsTo,
  DataType,
  Column,
  Table,
  Model,
} from 'sequelize-typescript';

import { MProduct } from '@modules/product/models';
import { MUser } from '@modules/user/models';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MReport extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiPropertyOptional({
    type: String,
    example: 'Message',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  message: string;

  @ApiProperty({
    example: [],
  })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  images: string[];

  @ForeignKey(() => MProduct)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  productId: ID;

  @BelongsTo(() => MProduct)
  product: MProduct;

  @ForeignKey(() => MUser)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  userId: ID;

  @BelongsTo(() => MUser)
  user: MUser;
}
