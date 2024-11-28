import { DataType, Column, Table, Model } from 'sequelize-typescript';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MOrderStatus extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: ID;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;
}
