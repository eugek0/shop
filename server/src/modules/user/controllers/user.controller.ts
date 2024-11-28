import { Body, Controller, Get, Patch } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';

import { Authorize, Docs, UserID } from '@common/decorators';

import { transaction } from '@common/utils';

import { UserService } from '@modules/user/services';

import { MUser } from '@modules/user/models';

import { ChangePassword, ChangeUser } from '@modules/user/dto';

import { changeUser, getUser } from '@modules/user/docs';

import { ID } from '@common/types';

@Controller('users')
@ApiTags('Users')
@Authorize()
export class UserController {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    private readonly userService: UserService,
  ) {}

  @Docs(getUser, MUser)
  @Get()
  getById(@UserID() userId: ID): Promise<MUser> {
    return transaction(this.sequelize, () => this.userService.getById(userId));
  }

  @Docs(changeUser, MUser)
  @Patch()
  change(@UserID() userId: ID, @Body() dto: ChangeUser): Promise<MUser> {
    return transaction(this.sequelize, () =>
      this.userService.change(userId, dto),
    );
  }

  @Docs(changeUser)
  @Patch('password')
  changePassword(
    @UserID() userId: ID,
    @Body() dto: ChangePassword,
  ): Promise<void> {
    return transaction(this.sequelize, () =>
      this.userService.changePassword(userId, dto),
    );
  }
}
