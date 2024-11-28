import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MGender } from '@modules/gender/models';

export class DGender {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: MGender['id'];

  @ApiPropertyOptional({
    type: String,
    example: 'Мужской',
  })
  title: MGender['title'];

  @ApiPropertyOptional({
    type: String,
    example: 'men',
  })
  abbreviation: MGender['abbreviation'];
}
