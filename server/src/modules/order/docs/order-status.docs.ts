import { ApiProperty } from '@nestjs/swagger';

import { ID } from '@common/types';

export class DOrderStatus {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({
    type: String,
    example: 'Создан',
  })
  title: string;
}
