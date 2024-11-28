import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';

import { Authorize, Docs, QueryValidate, UserID } from '@common/decorators';

import { transaction } from '@common/utils';

import { CartService } from '@modules/cart/services';
import { AddProduct, ChangeCart } from '@modules/cart/dto';

import {
  changeProductFromCart,
  deleteProductFromCart,
  getProductsInCart,
  addProductInCart,
  DCart,
} from '@modules/cart/docs';

import { ID } from '@common/types';
import { DFullProduct } from '@modules/product/docs/product.docs';

@ApiTags('Cart')
@Controller('cart')
@Authorize()
export class CartController {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    private readonly cartService: CartService,
  ) {}

  @Docs(addProductInCart, DFullProduct)
  @Post()
  add(@Body() dto: AddProduct, @UserID() userId: ID): Promise<DFullProduct> {
    return transaction(this.sequelize, () => this.cartService.add(dto, userId));
  }

  @Docs(deleteProductFromCart, [DCart])
  @Delete()
  delete(@QueryValidate('id') id: ID, @UserID() userId: ID): Promise<DCart[]> {
    return transaction(this.sequelize, () =>
      this.cartService.delete(id, userId),
    );
  }

  @Docs(changeProductFromCart, [DCart])
  @Patch()
  change(@Body() dto: ChangeCart, @UserID() userId: ID): Promise<DCart[]> {
    return transaction(this.sequelize, () =>
      this.cartService.change(dto, userId),
    );
  }

  @Docs(getProductsInCart, [DCart])
  @Get()
  get(@UserID() userId: ID): Promise<DCart[]> {
    return transaction(this.sequelize, () => this.cartService.get(userId));
  }
}
