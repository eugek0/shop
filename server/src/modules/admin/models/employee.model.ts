import { ApiProperty } from '@nestjs/swagger';

import { Hasher } from '@common/utils';

import {
  ForeignKey,
  BelongsTo,
  DataType,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';

import { MPosition } from '@modules/admin/models';

import { ID } from '@common/types';

@Table
export class MEmployee extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue('password', Hasher.hashSync(value));
    },
  })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: true })
  middleName: string | null;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  avatar: string;

  @Column({ type: DataType.DATE, allowNull: true })
  dateOfBirth: Date | null;

  @ForeignKey(() => MPosition)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: false,
  })
  positionId: ID;

  @BelongsTo(() => MPosition)
  position: MPosition;
}
