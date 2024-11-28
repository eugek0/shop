import { ApiProperty } from '@nestjs/swagger';

import { IsUUID } from '@common/decorators';

import { ID } from '@common/types';

export class CreateReport {
  @IsUUID()
  @ApiProperty()
  productId: ID;
}
