import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  IsOptional,
  IsString,
  IsEmail,
  IsPhone,
  IsUUID,
} from '@common/decorators';

import { ID } from '@common/types';

export class Recipient {
  @ApiProperty({
    type: String,
    example: 'Ivanov',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Ivan',
  })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ type: String, example: 'Иванович' })
  @IsString()
  @IsOptional()
  middleName: string | null;

  @ApiProperty({
    type: String,
    example: 'email@mail.ru',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: '+7 (999) 999-99-99',
  })
  @IsPhone()
  phone: string;
}

export class CreateOrder {
  @IsUUID()
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  paymentId: ID;

  @IsUUID()
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  deliveryId: ID;

  @ApiProperty({ type: Recipient })
  @ValidateNested()
  @Type(() => Recipient)
  recipient: Recipient;
}
