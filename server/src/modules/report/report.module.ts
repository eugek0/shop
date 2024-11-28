import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { ReportController } from '@modules/report/controllers';

import { ReportService } from '@modules/report/services';

import { MReport } from '@modules/report/models';

@Module({
  imports: [SequelizeModule.forFeature([MReport])],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [],
})
export class ReportModule {}
