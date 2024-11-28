import { DataType, HasMany, Column, Table, Model } from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MProduct } from '@modules/product/models';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MVolume extends Model {
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
    example: '60 ML',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;

  @HasMany(() => MProduct)
  products: MProduct[];
}
