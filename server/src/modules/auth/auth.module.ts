import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '@modules/user/user.module';
import { CodeModule } from '@modules/code/code.module';

import { AuthController } from '@modules/auth/controllers';

import { AuthService } from '@modules/auth/services';

@Module({
  imports: [forwardRef(() => UserModule), CodeModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
