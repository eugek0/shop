import { DataType, Column, Table, Model, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { MProduct } from '@modules/product/models';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MDiscount extends Model {
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
    example: 30,
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  value: number;

  @ApiProperty({
    type: String,
    example: '30%',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    set() {
      const value = this.getDataValue('value');
      console.log(value);
      this.setDataValue('preview', `${value}%`);
    },
  })
  title: string;

  @HasMany(() => MProduct)
  products: MProduct[];
}
