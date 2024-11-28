import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductController } from '@modules/product/controllers';

import { ProductHistoryService } from '@modules/product/services';
import { ProductService } from '@modules/product/services';

import { MPriceHistory, MProduct } from '@modules/product/models';
import { MMotive } from '@modules/motive/models';
import { MGender } from '@modules/gender/models';
import { MVolume } from '@modules/volume/models';
import { MColor } from '@modules/color/models';
import { MType } from '@modules/type/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      MProduct,
      MVolume,
      MType,
      MColor,
      MGender,
      MMotive,
      MPriceHistory,
    ]),
  ],
  providers: [ProductService, ProductHistoryService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
