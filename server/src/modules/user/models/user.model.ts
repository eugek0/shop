import { Table, Column, HasMany, DataType, Model } from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MSeance } from '@modules/seance/models';

import { UserStatusEnum } from '@common/enums';

import { ID } from '@common/types';
import { Hasher } from '@common/utils/hasher.utils';

@Table({ paranoid: true })
export class MUser extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({ type: String, example: 'user@rmail.ru' })
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

  @ApiProperty({ type: String, example: 'Иванов' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ type: String, example: 'Иван' })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiPropertyOptional({ type: String, example: 'Иванович' })
  @Column({ type: DataType.STRING, allowNull: true })
  middleName: string | null;

  @ApiPropertyOptional({ type: String, example: '+7 (999) 999-99-99' })
  @Column({ type: DataType.STRING, allowNull: true })
  phone: string | null;

  @ApiPropertyOptional({ type: String, example: 'user.png' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  avatar: string;

  @ApiPropertyOptional({
    type: String,
    example: 'г. Ростов-на-Дону,Коммунистический проспект, 10',
    description: 'Адрес доставки, будет приходить в момент оформления заказа',
  })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  address: string;

  @ApiPropertyOptional({
    type: String,
    example: '2023-05-07T11:14:07.180Z',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  dateOfBirth: Date | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: UserStatusEnum.pending,
  })
  status: UserStatusEnum;

  @HasMany(() => MSeance)
  seances: MSeance[];
}
