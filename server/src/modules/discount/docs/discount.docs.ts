import { ApiProperty } from '@nestjs/swagger';

import { ID } from '@common/types';

export class DDiscount {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({
    type: Number,
    example: 30,
  })
  value: number;

  @ApiProperty({
    type: String,
    example: '30%',
  })
  title: string;
}
