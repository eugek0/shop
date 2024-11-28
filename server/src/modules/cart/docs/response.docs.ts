import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DocsClass } from '@common/decorators';

import { DVolume } from '@modules/volume/docs';
import { DGender } from '@modules/gender/docs';
import { DMotive } from '@modules/motive/docs';

import { ID } from '@common/types';

export class ProductInMyCart {
  @ApiProperty({
    type: String,
    example: '49a37307-96cc-49fd-9eff-5e287e6d805',
  })
  id: ID;

  @ApiProperty({
    type: String,
    example: 'Charisme Sport',
  })
  title: string;

  @ApiPropertyOptional({
    type: String,
    example: '20.png',
  })
  preview: string | null;

  @ApiProperty({
    type: Number,
    example: 40,
  })
  quantity: number;

  @DocsClass(DMotive, 'id', 'title')
  motive: Pick<DMotive, 'id' | 'title'>;

  @DocsClass(DGender, 'id', 'title')
  gender: Pick<DGender, 'id' | 'title'>;

  @DocsClass(DVolume, 'id', 'title')
  volume: Pick<DVolume, 'id' | 'title'>;
}
