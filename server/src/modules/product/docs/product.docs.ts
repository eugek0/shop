import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DocsClass } from '@common/decorators';

import { DDiscount } from '@modules/discount/docs';
import { DMotive } from '@modules/motive/docs';
import { DVolume } from '@modules/volume/docs';
import { DGender } from '@modules/gender/docs';
import { DColor } from '@modules/color/docs';
import { DType } from '@modules/type/docs';

import { ID } from '@common/types';

export class DProductHistory {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiPropertyOptional({
    type: Number,
    example: 250,
  })
  value: number;

  @ApiPropertyOptional({
    type: String,
    example: '2023-05-07T11:14:07.180Z',
  })
  createdAt: string;
}

export class DCatalogProduct {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({
    type: String,
    example: 'Charisme Sport',
  })
  title: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Description',
  })
  description: null | string;

  @ApiProperty({
    example: ['20.png', '20.png'],
  })
  images: string[];

  @ApiProperty({
    example: '20.png',
  })
  preview: string;

  @ApiProperty({
    type: Number,
    example: 4000,
    description: 'Цена товара без скидки',
  })
  price: number;

  @ApiProperty({
    type: Number,
    example: 30,
    description: 'Количество товара на складе',
  })
  quantity: number;

  @ApiPropertyOptional({
    type: Number,
    example: 500,
    description: 'Величина скидки, null если скидки нет',
  })
  priceDiscount: number | null;

  @ApiPropertyOptional({
    type: Number,
    example: 3500,
    description: 'Цена товара со скидкой, null если скидки нет',
  })
  priceWithDiscount: number | null;

  @ApiProperty({
    type: Boolean,
    example: true,
    description:
      'Флаг показывающий находится ли товар в избранном, true или false',
  })
  isFavorite: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
    description:
      'Флаг показывающий находится ли товар в корзине, true или false',
  })
  isAddedToCart: boolean;

  @DocsClass(DGender, 'id', 'title', 'abbreviation')
  gender: Pick<DGender, 'id' | 'title' | 'abbreviation'>;

  @DocsClass(DVolume)
  volume: Pick<DVolume, 'id' | 'title'>;

  @DocsClass(DMotive, 'id', 'title')
  motive: Pick<DMotive, 'id' | 'title'>;

  @DocsClass(DDiscount, 'id', 'title', 'value')
  discount: Pick<DDiscount, 'id' | 'title' | 'value'>;
}

export class DFullProduct extends DCatalogProduct {
  @DocsClass(
    DType,
    'id',
    'title',
    'topNotes',
    'middleNotes',
    'lowNotes',
    'sentiment',
  )
  type: Pick<
    DType,
    'id' | 'title' | 'topNotes' | 'middleNotes' | 'lowNotes' | 'sentiment'
  >;

  @DocsClass(DColor, 'id', 'title')
  color: Pick<DColor, 'id' | 'title'>;

  @DocsClass([DProductHistory], 'value', 'createdAt')
  priceHistory: DProductHistory[];
}
