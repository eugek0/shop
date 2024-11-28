import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ID } from '@common/types';

export class NavigationParams {
  @ApiProperty({
    type: Boolean,
    example: false,
  })
  isDiscount: boolean;

  @ApiPropertyOptional({
    type: String,
    example: '49a37307-96cc-49fd-9eff-5e287e6d805',
    description: 'Может быть uuid или null',
  })
  typeId: ID | null;

  @ApiPropertyOptional({
    type: String,
    example: '49a37307-96cc-49fd-9eff-5e287e6d805',
    description: 'Может быть uuid или null',
  })
  genderId: ID | null;

  @ApiPropertyOptional({
    type: String,
    example: null,
    description: 'Может быть uuid или null',
  })
  colorId: ID | null;

  @ApiPropertyOptional({
    type: String,
    example: null,
    description: 'Может быть uuid или null',
  })
  volumeId: ID | null;

  @ApiPropertyOptional({
    type: String,
    example: '49a37307-96cc-49fd-9eff-5e287e6d805',
    description: 'Может быть uuid или null',
  })
  motiveId: ID | null;
}

export class NavigationHeader {
  @ApiPropertyOptional({
    type: String,
    example: '49a37307-96cc-49fd-9eff-5e287e6d805',
  })
  id: ID;

  @ApiProperty({ type: String, example: 'for man' })
  title: string;

  @ApiProperty({ type: NavigationParams })
  params: NavigationParams;
}

export class NavigationMain extends NavigationHeader {
  @ApiProperty({ type: String, example: 'FOR MAN' })
  title: string;

  @ApiProperty({ type: String, example: 'коллекция мужской парфюмерии' })
  subTitle: string;

  @ApiProperty({ type: String, example: 'forMan.png' })
  image: string;

  @ApiProperty({ type: String, example: 'подробнее' })
  buttonText: string;
}
