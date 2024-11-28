import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ForeignKey,
  DataType,
  Column,
  Table,
  Model,
} from 'sequelize-typescript';

import { MProduct } from '@modules/product/models';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MPriceHistory extends Model {
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
    example: 'Мужской',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @ForeignKey(() => MProduct)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  productId: ID;
}
