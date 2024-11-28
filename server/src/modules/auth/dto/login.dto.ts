import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPassword, IsString } from '@common/decorators';

export class Email {
  @ApiProperty({
    type: String,
    example: 'email@mail.ru',
  })
  @IsEmail()
  email: string;
}

export class LoginUser extends Email {
  @ApiProperty({
    type: String,
    example: 'M2v4qob5',
  })
  @IsPassword()
  password: string;
}

export class ConfirmationUser extends Email {
  @ApiProperty({
    type: String,
    example: '123456',
  })
  @IsString()
  code: string;
}
