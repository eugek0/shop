import { SequelizeModule } from '@nestjs/sequelize';

import { Module } from '@nestjs/common';

import { FilterController } from '@modules/filter/controllers';

import { FilterService } from '@modules/filter/services';

import { MProduct } from '@modules/product/models';
import { MGender } from '@modules/gender/models';
import { MMotive } from '@modules/motive/models';
import { MVolume } from '@modules/volume/models';
import { MColor } from '@modules/color/models';
import { MType } from '@modules/type/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      MProduct,
      MVolume,
      MGender,
      MMotive,
      MColor,
      MType,
    ]),
  ],
  providers: [FilterService],
  controllers: [FilterController],
  exports: [],
})
export class FilterModule {}
