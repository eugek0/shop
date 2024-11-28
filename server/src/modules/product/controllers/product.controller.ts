import { Controller, Get, Query } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';

import { Authorize, Docs, QueryValidate, UserID } from '@common/decorators';

import { transaction } from '@common/utils';

import { ProductService } from '@modules/product/services';

import { FilterDto } from '@modules/product/dto';

import { getAll, getById } from '@modules/product/docs';

import { ID } from '@common/types';
import {
  DCatalogProduct,
  DFullProduct,
} from '@modules/product/docs/product.docs';

@Controller('products')
@Authorize(false)
@ApiTags('Products')
export class ProductController {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    private readonly productService: ProductService,
  ) {}

  @Docs(getAll, [DCatalogProduct])
  @Get()
  getAll(@Query() filter: FilterDto, @UserID() userId: ID) {
    return transaction(this.sequelize, () =>
      this.productService.getAll(filter, userId),
    );
  }

  @Docs(getById, DFullProduct)
  @Get('current')
  getById(
    @QueryValidate('id') id: ID,
    @UserID() userId: ID,
  ): Promise<DFullProduct> {
    return transaction(this.sequelize, () =>
      this.productService.getById(id, userId),
    );
  }
}
