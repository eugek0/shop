import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserController } from '@modules/user/controllers';

import { UserService } from '@modules/user/services';

import { MUser } from '@modules/user/models';

@Module({
  imports: [SequelizeModule.forFeature([MUser])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
