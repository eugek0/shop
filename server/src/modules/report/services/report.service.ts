import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ErrorService } from '@common/errors';

import { MReport } from '@modules/report/models';

@Injectable()
export class ReportService extends ErrorService {
  constructor(@InjectModel(MReport) private report: typeof MReport) {
    super();
  }
}
