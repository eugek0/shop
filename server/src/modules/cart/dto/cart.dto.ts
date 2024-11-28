import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNumber, IsUUID } from '@common/decorators';

import { ID } from '@common/types';

export class AddProduct {
  @IsUUID()
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  productId: ID;
}

export class ChangeCart {
  @IsUUID()
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @IsNumber()
  @ApiPropertyOptional({ type: Number, example: 2, default: 1 })
  count = 1;
}
