import { ApiProperty } from '@nestjs/swagger';

import { MMotive } from '@modules/motive/models';

export class DMotive {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: MMotive['id'];

  @ApiProperty({
    type: String,
    example: 'string',
  })
  title: MMotive['title'];
}
