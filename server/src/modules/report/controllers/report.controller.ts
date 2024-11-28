import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Authorize } from '@common/decorators';

import { ReportService } from '@modules/report/services';

@Controller('reports')
@ApiTags('Reports')
@Authorize()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
}
