import { forwardRef, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SeanceModule } from '@modules/seance/seance.module';
import { CookieModule } from '@modules/cookie/cookie.module';

import { TokenService } from '@modules/tokens/services';
import { CookieService } from '@modules/cookie/services';

import { AccessGuard, RefreshGuard } from '@modules/tokens/guards';

@Global()
@Module({
  imports: [
    JwtModule.register({}),
    CookieModule,
    forwardRef(() => SeanceModule),
  ],
  providers: [TokenService, AccessGuard, RefreshGuard, CookieService],
  exports: [TokenService],
})
export class TokenModule {}
