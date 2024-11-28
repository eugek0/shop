import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';

import { Authorize, Docs, UserID } from '@common/decorators';

import { transaction } from '@common/utils';

import { FavoriteService } from '@modules/favorite/services';

import { Favorite } from '@modules/favorite/dto';

import { ID } from '@common/types';

import { DCatalogProduct } from '@modules/product/docs';
import {
  deleteFavoritesDocs,
  addFavoritesDocs,
  getFavoritesDocs,
  DFavorite,
} from '@modules/favorite/docs';

@Controller('favorites')
@ApiTags('Favorites')
@Authorize()
export class FavoriteController {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Docs(getFavoritesDocs, [DFavorite])
  @Get()
  getAll(@UserID() userId: ID): Promise<DFavorite[]> {
    return transaction(this.sequelize, () =>
      this.favoriteService.getAll(userId),
    );
  }

  @Docs(addFavoritesDocs, DCatalogProduct)
  @Post()
  add(@Query() dto: Favorite, @UserID() userId: ID): Promise<DCatalogProduct> {
    return transaction(this.sequelize, () =>
      this.favoriteService.add(dto, userId),
    );
  }

  @Docs(deleteFavoritesDocs, DCatalogProduct)
  @Delete()
  delete(
    @Query() dto: Favorite,
    @UserID() userId: ID,
  ): Promise<DCatalogProduct> {
    return transaction(this.sequelize, () =>
      this.favoriteService.delete(dto, userId),
    );
  }
}
