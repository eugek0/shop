import { Module } from '@nestjs/common';

import { CookieService } from '@modules/cookie/services/cookie.service';

@Module({
  imports: [],
  providers: [CookieService],
  controllers: [],
  exports: [CookieService],
})
export class CookieModule {}
