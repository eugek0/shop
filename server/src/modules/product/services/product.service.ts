import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ErrorService } from '@common/errors';

import { ID } from '@common/types';
import { MProduct } from '@modules/product/models';
import { FilterDto } from '@modules/product/dto';
import { getProduct, getProducts } from '@modules/product/query';
import { MColor } from '@modules/color/models';
import { MGender } from '@modules/gender/models';
import { MType } from '@modules/type/models';
import { MVolume } from '@modules/volume/models';
import { DFullProduct } from '@modules/product/docs/product.docs';

@Injectable()
export class ProductService extends ErrorService {
  constructor(
    @InjectModel(MProduct) private product: typeof MProduct,
    @InjectModel(MGender) private gender: typeof MGender,
    @InjectModel(MVolume) private volume: typeof MVolume,
    @InjectModel(MColor) private color: typeof MColor,
    @InjectModel(MType) private type: typeof MType,
  ) {
    super();
  }

  public async getAll(filter: FilterDto, userId: ID) {
    const maxPrice = await this.getMaxPrice(filter.maxPrice);
    const minPrice = await this.getMaxPrice(filter.minPrice);

    const options = getProducts({ ...filter, minPrice, maxPrice }, userId);

    const { count, rows } = await this.product.findAndCountAll(options);
    const { page, limit } = filter;

    return {
      count,
      limit,
      page,
      rows,
    };
  }

  public async getById(id: ID, userId?: ID): Promise<DFullProduct> {
    const options = getProduct(id, userId);

    const candidate = await this.product.findOne<any>(options);

    if (!candidate) this.notFound('product.not_found');

    return candidate;
  }

  private async getMaxPrice(candidate: number | null): Promise<number> {
    const isNumber = typeof candidate === 'number';

    if (isNumber) return candidate;

    return this.product.max('price');
  }
}
