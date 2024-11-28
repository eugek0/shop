import { Body, Controller, Patch, Post, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import { Response } from 'express';

import { Device, Docs } from '@common/decorators';

import { transaction } from '@common/utils';

import { AuthService } from '@modules/auth/services';

import { ConfirmationUser, Email, LoginUser } from '@modules/auth/dto';
import { CreateUserDto } from '@modules/user/dto';

import { confirm, logIn, registration, newCode } from '@modules/auth/docs';

import { IDevice } from '@common/types';

@ApiTags('Authorization')
@Controller('authorization')
export class AuthController {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    private readonly authService: AuthService,
  ) {}

  @Docs(registration)
  @Post('registration')
  registration(@Body() dto: CreateUserDto) {
    return transaction(this.sequelize, () =>
      this.authService.registration(dto),
    );
  }

  @Docs(logIn)
  @Post('login')
  login(
    @Device() device: IDevice,
    @Body() dto: LoginUser,
    @Res() res: Response,
  ): Promise<void> {
    return transaction(this.sequelize, () =>
      this.authService.login(dto, device, res),
    );
  }

  @Docs(confirm)
  @Patch('confirmation')
  confirmation(
    @Device() device: IDevice,
    @Body() dto: ConfirmationUser,
    @Res() res: Response,
  ) {
    return transaction(this.sequelize, () =>
      this.authService.confirmation(dto, device, res),
    );
  }

  @Docs(newCode)
  @Patch('newCode')
  newCode(@Body() dto: Email): Promise<void> {
    return transaction(this.sequelize, () => this.authService.newCode(dto));
  }
}
