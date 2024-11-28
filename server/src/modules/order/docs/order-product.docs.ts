import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DocsClass } from '@common/decorators';

import { DCatalogProduct } from '@modules/product/docs';

import { ID } from '@common/types';

export class DOrderProduct {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({
    type: Number,
    example: 12000,
    description: 'Стоимость продуктов',
  })
  price: number;

  @ApiPropertyOptional({
    type: Number,
    example: 10500,
    description: 'Стоимость продуктов со скидкой',
  })
  priceWithDiscount: number;

  @ApiPropertyOptional({
    type: Number,
    example: 1500,
    description: 'Величина скидки продуктов',
  })
  priceDiscount: number;

  @ApiProperty({
    type: Number,
    example: 3,
    description: 'Количество продуктов',
  })
  count: number;

  @DocsClass(
    DCatalogProduct,
    'id',
    'title',
    'preview',
    'gender',
    'volume',
    'motive',
  )
  product: Pick<
    DCatalogProduct,
    'id' | 'title' | 'preview' | 'gender' | 'volume' | 'motive'
  >;
}
