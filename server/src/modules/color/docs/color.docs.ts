import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MColor } from '@modules/color/models';

export class DColor {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: MColor['id'];

  @ApiPropertyOptional({
    type: String,
    example: 'Цвет',
  })
  title: MColor['title'];
}
