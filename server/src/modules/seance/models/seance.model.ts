import { ApiProperty } from '@nestjs/swagger';
import {
  ForeignKey,
  BelongsTo,
  DataType,
  Column,
  Table,
  Model,
} from 'sequelize-typescript';

import { MUser } from '@modules/user/models';

import { ID } from '@common/types';

@Table
export class MSeance extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  token: string;

  @ApiProperty({
    type: String,
    example: '192.168.0.123',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  ip: string;

  @ApiProperty({
    type: String,
    example: 'Windows',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  os: string;

  @ApiProperty({
    type: String,
    example: 'Google chrome',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  app: string;

  @ApiProperty({
    type: String,
    example: 'Rostov-on-don',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  city: string;

  @ApiProperty({
    type: String,
    example: 'Rostovskaya oblast',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  region: string;

  @ApiProperty({
    type: String,
    example: 'Russia',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  country: string;

  @ForeignKey(() => MUser)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: ID;

  @BelongsTo(() => MUser)
  user: MUser;

  @ApiProperty({
    type: String,
    example: '2023-05-03T20:13:27.888Z',
    description: 'authorization date',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    example: '2023-05-03T20:13:27.888Z',
    description: 'date the authorization information was updated',
  })
  updatedAt: string;
}
