import { DataType, Column, Table, Model, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { MProduct } from '@modules/product/models';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MMotive extends Model {
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
    example: 'string',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @HasMany(() => MProduct)
  products: MProduct[];
}
