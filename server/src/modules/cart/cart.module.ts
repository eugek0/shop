import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { ProductModule } from '@modules/product/product.module';

import { CartController } from '@modules/cart/controllers';

import { CartService } from '@modules/cart/services';

import { MCart } from '@modules/cart/models';

@Module({
  imports: [ProductModule, SequelizeModule.forFeature([MCart])],
  providers: [CartService],
  controllers: [CartController],
  exports: [],
})
export class CartModule {}
