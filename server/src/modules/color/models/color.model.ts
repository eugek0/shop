import { DataType, HasMany, Column, Table, Model } from 'sequelize-typescript';

import { MProduct } from '@modules/product/models';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MColor extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: ID;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @HasMany(() => MProduct)
  products: MProduct[];
}
