import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

import { ErrorService } from '@common/errors';

import { MFavorite } from '@modules/favorite/models';
import { MProduct } from '@modules/product/models';

import { Favorite } from '@modules/favorite/dto';
import { FavoriteEnum } from '@modules/favorite/enums';

import { getProduct } from '@modules/product/query';

import { ID } from '@common/types';
import { getFavorites } from '@modules/favorite/query';
import { DFavorite } from '@modules/favorite/docs';
import { DCatalogProduct } from '@modules/product/docs';

@Injectable()
export class FavoriteService extends ErrorService {
  constructor(
    @InjectModel(MFavorite) private favorite: typeof MFavorite,
    @InjectModel(MProduct) private product: typeof MProduct,
  ) {
    super();
  }

  public async getAll(userId: ID): Promise<DFavorite[]> {
    const options = getFavorites(userId);

    return this.product.findAll<any>(options);
  }

  public async add(
    { productId, type }: Favorite,
    userId: ID,
  ): Promise<DCatalogProduct> {
    const options = this.getOptions({ productId, type }, userId);
    const product = await this.findProductById(productId);

    if (!product) this.productNotFound;

    await this.checkAlready(productId, userId);
    await this.create(productId, userId);

    return this.findProductById(productId, options);
  }

  public async delete(
    { productId, type }: Favorite,
    userId: ID,
  ): Promise<DCatalogProduct> {
    const options = this.getOptions({ productId, type }, userId);
    const product = await this.findProductById(productId);

    if (!product) this.productNotFound;

    const candidate = await this.find(productId, userId);

    if (!candidate) this.productNotFavorite;

    await candidate.destroy();

    return this.findProductById(productId, options);
  }

  private async create(productId: ID, userId: ID): Promise<MFavorite> {
    return this.favorite.create({ productId, userId });
  }

  private async checkAlready(productId: ID, userId: ID) {
    const candidate = await this.find(productId, userId);

    if (candidate) this.favoriteAlreadyExist;
  }

  private async find(productId: ID, userId: ID): Promise<MFavorite | null> {
    return this.favorite.findOne({ where: { productId, userId } });
  }

  private async findProductById(
    id: ID,
    options?: FindOptions,
  ): Promise<DCatalogProduct | null> {
    return this.product.findOne<any>({
      where: { id, ...options?.where },
      ...options,
    });
  }

  private get favoriteAlreadyExist(): HttpException {
    throw this.alreadyExist('favorite.exist');
  }

  private get productNotFound(): HttpException {
    throw this.notFound('product.not_found');
  }

  private get productNotFavorite(): HttpException {
    throw this.badRequest('favorite.not_found');
  }

  private getOptions({ productId, type }: Favorite, userId: ID): FindOptions {
    switch (type) {
      case FavoriteEnum.catalog:
        return getFavorites(userId);
      case FavoriteEnum.productPage:
        return getProduct(productId, userId);
      default:
        return getProduct(productId, userId);
    }
  }
}
