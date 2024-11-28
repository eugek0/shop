import { DataType, Column, Model, Table } from 'sequelize-typescript';

import { ID } from '@common/types';

@Table({ tableName: 'files' })
export class MFile extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: ID;

  @Column({ allowNull: true, type: DataType.STRING })
  mime: string;

  @Column({ allowNull: true, type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  comment: string;

  @Column({ type: DataType.STRING, allowNull: true })
  size: string;
}
