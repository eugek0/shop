import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from '@common/decorators';

import { IsOptional } from 'class-validator';

export class QueryDto {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    example: 'ff',
  })
  id: string;
}
