import { forwardRef, Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TokenModule } from '@modules/tokens/token.module';

import { SeanceController } from '@modules/seance/controllers';

import { SeanceService } from '@modules/seance/services';

import { MSeance } from '@modules/seance/models';
import { CookieModule } from '@modules/cookie/cookie.module';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([MSeance]),
    forwardRef(() => TokenModule),
    CookieModule,
  ],
  providers: [SeanceService],
  controllers: [SeanceController],
  exports: [SeanceService],
})
export class SeanceModule {}
