import { DataType, Column, Table, Model, HasMany } from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MProduct } from '@modules/product/models';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MType extends Model {
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

  @ApiPropertyOptional({
    type: String,
    example: 'topNotes',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  topNotes: null | string;

  @ApiProperty({
    type: String,
    example: 'middleNotes',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  middleNotes: string;

  @ApiProperty({
    type: String,
    example: 'lowNotes',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  lowNotes: number;

  @ApiProperty({
    type: String,
    example: 'lowNotes',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  sentiment: string;

  @HasMany(() => MProduct)
  products: MProduct[];
}
