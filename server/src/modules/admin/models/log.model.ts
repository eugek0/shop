import { DataType, Column, Model, Table } from 'sequelize-typescript';

import { ID } from '@common/types';

@Table({ tableName: 'logs' })
export class MLog extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: ID;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: false,
  })
  recordId: string;

  @Column({ type: DataType.STRING, allowNull: true })
  recordTitle: string | null;

  @Column({ type: DataType.JSONB, allowNull: true })
  difference: Record<string, unknown> | null;

  @Column({ type: DataType.STRING, allowNull: false })
  action: string;

  @Column({ type: DataType.STRING, allowNull: false })
  resource: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: false,
  })
  employeeId: ID;
}
