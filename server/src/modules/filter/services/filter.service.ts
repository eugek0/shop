import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

import { ErrorService } from '@common/errors';

import { MProduct } from '@modules/product/models';
import { MMotive } from '@modules/motive/models';
import { MGender } from '@modules/gender/models';
import { MVolume } from '@modules/volume/models';
import { MColor } from '@modules/color/models';
import { MType } from '@modules/type/models';

import {
  FOGendersFilter,
  FOColorsFilter,
  FOMotivesFilter,
  FOPricesFilter,
  FOTypesFilter,
  FOVolumesFilter,
} from '@modules/filter/query';

import {
  RVolumesResponse,
  RMotivesResponse,
  RColorsResponse,
  RTypesResponse,
  RPricesFilter,
  OrderDto,
} from '@modules/filter/docs';

import { OrderEnum } from '@modules/product/enums';

@Injectable()
export class FilterService extends ErrorService {
  constructor(
    @InjectModel(MProduct) private product: typeof MProduct,
    @InjectModel(MVolume) private volume: typeof MVolume,
    @InjectModel(MGender) private gender: typeof MGender,
    @InjectModel(MMotive) private motive: typeof MMotive,
    @InjectModel(MColor) private color: typeof MColor,
    @InjectModel(MType) private type: typeof MType,
  ) {
    super();
  }

  public async getGenders() {
    const option = FOGendersFilter();

    return this.gender.findAll(option);
  }

  public async getMotives(): Promise<RMotivesResponse[]> {
    const option = FOMotivesFilter();

    return this.motive.findAll(option);
  }

  public async getVolumes(): Promise<RVolumesResponse[]> {
    const option = FOVolumesFilter();

    return this.volume.findAll(option);
  }

  public async getPrices(): Promise<RPricesFilter> {
    const option = FOPricesFilter();

    return this.product.findOne<any>(option);
  }

  public async getTypes(): Promise<RTypesResponse[]> {
    const option = FOTypesFilter();

    return this.type.findAll(option);
  }

  public async getColors(): Promise<RColorsResponse[]> {
    const option = FOColorsFilter();

    return this.color.findAll(option);
  }

  public getOrders(): OrderDto[] {
    return [
      {
        id: OrderEnum.UP_PRICE,
        title: 'По возрастанию цены',
      },
      {
        id: OrderEnum.DOWN_PRICE,
        title: 'По убыванию цены',
      },
    ];
  }
}
