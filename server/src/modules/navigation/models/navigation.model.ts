import { ApiProperty } from '@nestjs/swagger';
import {
  ForeignKey,
  DataType,
  Column,
  Table,
  Model,
  BelongsTo,
} from 'sequelize-typescript';

import { MVolume } from '@modules/volume/models';
import { MMotive } from '@modules/motive/models';
import { MGender } from '@modules/gender/models';
import { MColor } from '@modules/color/models';
import { MType } from '@modules/type/models';

import { ID } from '@common/types';

@Table({ paranoid: true })
export class MNavigation extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  subTitle: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'подробнее',
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  buttonText: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDiscount: boolean;

  @ForeignKey(() => MType)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    defaultValue: null,
  })
  typeId: ID;

  @BelongsTo(() => MType)
  type: MType;

  @ForeignKey(() => MGender)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    defaultValue: null,
  })
  genderId: ID;

  @BelongsTo(() => MGender)
  gender: MGender;

  @ForeignKey(() => MColor)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    defaultValue: null,
  })
  colorId: ID;

  @BelongsTo(() => MColor)
  color: MColor;

  @ForeignKey(() => MVolume)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    defaultValue: null,
  })
  volumeId: ID;

  @BelongsTo(() => MVolume)
  volume: MVolume;

  @ForeignKey(() => MMotive)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    defaultValue: null,
  })
  motiveId: ID;

  @BelongsTo(() => MMotive)
  motive: MMotive;
}
