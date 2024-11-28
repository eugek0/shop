import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsPassword,
  IsOptional,
  IsString,
  IsPhone,
  IsEmail,
  IsDate,
} from '@common/decorators';

export class ChangeUser {
  @ApiPropertyOptional({
    type: String,
    example: 'Ivanov',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Ivan',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional({ type: String, example: 'Иванович' })
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiPropertyOptional({
    type: String,
    example: '2023-05-07T11:14:07.180Z',
  })
  @IsOptional()
  @IsDate()
  dateOfBirth: string;

  @ApiPropertyOptional({
    type: String,
    example: 'email@mail.ru',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({
    type: String,
    example: '+7 (999) 999-99-99',
  })
  @IsOptional()
  @IsPhone()
  phone: string;

  @ApiPropertyOptional({
    type: String,
    example: 'г. Ростов-на-Дону,Коммунистический проспект, 10',
    description: 'Адрес доставки, будет приходить в момент оформления заказа',
  })
  @IsOptional()
  @IsString()
  address: string;
}

export class ChangePassword {
  @ApiProperty({
    type: String,
    example: 'M2!v4qob',
  })
  @IsPassword()
  oldPassword: string;

  @ApiProperty({
    type: String,
    example: 'NF5trfFW!245',
  })
  @IsPassword()
  password: string;
}
