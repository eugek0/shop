import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsPassword,
  IsOptional,
  IsString,
  IsEmail,
  IsDate,
} from '@common/decorators';

export class CreateUserDto {
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

  @ApiPropertyOptional({
    type: String,
    example: '2023-05-07T11:14:07.180Z',
  })
  @IsOptional()
  @IsDate()
  dateOfBirth: string | null = null;

  @ApiProperty({
    type: String,
    example: 'email@mail.ru',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'M2v4qob5',
  })
  @IsPassword()
  password: string;
}
