import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { FavoriteController } from '@modules/favorite/controllers';

import { FavoriteService } from '@modules/favorite/services';

import { MFavorite } from '@modules/favorite/models';
import { MProduct } from '@modules/product/models';

@Module({
  imports: [SequelizeModule.forFeature([MFavorite, MProduct])],
  providers: [FavoriteService],
  controllers: [FavoriteController],
  exports: [],
})
export class FavoriteModule {}
