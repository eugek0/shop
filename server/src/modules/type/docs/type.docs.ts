import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ID } from '@common/types';

export class DType {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({
    type: String,
    example: 'string',
  })
  title: string;

  @ApiPropertyOptional({
    type: String,
    example: 'topNotes',
  })
  topNotes: null | string;

  @ApiProperty({
    type: String,
    example: 'middleNotes',
  })
  middleNotes: string;

  @ApiProperty({
    type: String,
    example: 'lowNotes',
  })
  lowNotes: number;

  @ApiProperty({
    type: String,
    example: 'lowNotes',
  })
  sentiment: string;
}
