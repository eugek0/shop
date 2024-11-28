import { InjectConnection } from '@nestjs/sequelize';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';

import { Docs } from '@common/decorators';

import { transaction } from '@common/utils';

import { FilterService } from '@modules/filter/services';

import {
  getVolumes,
  getGenders,
  getMotives,
  getPrices,
  getOrders,
  getColors,
  getTypes,
} from '@modules/filter/docs';

import {
  RVolumesResponse,
  RGendersResponse,
  RMotivesResponse,
  RColorsResponse,
  RTypesResponse,
  RPricesFilter,
  OrderDto,
} from '@modules/filter/docs';

@Controller('filter')
@ApiTags('Filter')
export class FilterController {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    private readonly filterService: FilterService,
  ) {}

  @Docs(getGenders, [RGendersResponse])
  @Get('genders')
  getGenders(): Promise<RGendersResponse[]> {
    return transaction(this.sequelize, () => this.filterService.getGenders());
  }

  @Docs(getMotives, [RMotivesResponse])
  @Get('motives')
  getMotives(): Promise<RMotivesResponse[]> {
    return transaction(this.sequelize, () => this.filterService.getMotives());
  }

  @Docs(getVolumes, [RVolumesResponse])
  @Get('volumes')
  getVolumes(): Promise<RVolumesResponse[]> {
    return transaction(this.sequelize, () => this.filterService.getVolumes());
  }

  @Docs(getPrices, RPricesFilter)
  @Get('prices')
  getPrices(): Promise<RPricesFilter> {
    return transaction(this.sequelize, () => this.filterService.getPrices());
  }

  @Docs(getTypes, [RTypesResponse])
  @Get('types')
  getTypes(): Promise<RTypesResponse[]> {
    return transaction(this.sequelize, () => this.filterService.getTypes());
  }

  @Docs(getColors, [RColorsResponse])
  @Get('colors')
  getColors(): Promise<RColorsResponse[]> {
    return transaction(this.sequelize, () => this.filterService.getColors());
  }

  @Docs(getOrders, [OrderDto])
  @Get('orders')
  getOrders(): OrderDto[] {
    return transaction(this.sequelize, () => this.filterService.getOrders());
  }
}
