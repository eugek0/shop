import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { NavigationController } from '@modules/navigation/controllers';

import { NavigationService } from '@modules/navigation/services';

import { MNavigation } from '@modules/navigation/models';

@Module({
  imports: [SequelizeModule.forFeature([MNavigation])],
  providers: [NavigationService],
  controllers: [NavigationController],
  exports: [],
})
export class NavigationModule {}
