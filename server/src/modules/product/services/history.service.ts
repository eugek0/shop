import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ErrorService } from '@common/errors';

import { ID } from '@common/types';
import { MPriceHistory, MProduct } from '@modules/product/models';

@Injectable()
export class ProductHistoryService extends ErrorService {
  constructor(
    @InjectModel(MProduct) private product: typeof MProduct,
    @InjectModel(MPriceHistory) private history: typeof MPriceHistory,
  ) {
    super();
    this.addHooks();
  }

  private async create(productId: ID, value: number): Promise<void> {
    await this.history.create({ productId, value });
  }

  private async handlerUpdatePrice(product: MProduct): Promise<void> {
    const current = product.toJSON<MProduct>();

    const previous = product['_previousDataValues'];

    if (current.price === previous.price) return;

    const { id, price } = current;

    return this.create(id, price);
  }

  private async addHooks() {
    await this.product.addHook('beforeUpdate', async (product: MProduct) => {
      await this.handlerUpdatePrice(product);
    });

    await this.product.addHook('beforeCreate', (product: MProduct) => {
      const { id, price } = product.toJSON<MProduct>();
      this.create(id, price);
    });
  }
}
