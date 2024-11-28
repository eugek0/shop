import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ID } from '@common/types';
import { DocsClass } from '@common/decorators';

import { ProductInMyCart } from '@modules/cart/docs/response.docs';

export class DCart {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({
    type: Number,
    example: 3,
  })
  count: number;

  @ApiProperty({
    type: Number,
    example: 40,
  })
  maxCount: number;

  @ApiProperty({
    type: Number,
    example: 12000,
    description: 'Цена продукта умноженная на кол-во продуктов в корзине',
  })
  price: number;

  @ApiPropertyOptional({
    type: Number,
    example: 1500,
    description:
      'Величина скидки продукта умноженная на кол-во даного продукта в корзине',
  })
  priceDiscount: number | null;

  @ApiPropertyOptional({
    type: Number,
    example: 10500,
    description:
      'Цена продуктов со скидкой умноженная на кол-во продукта в корзине',
  })
  priceWithDiscount: number | null;

  @ApiProperty({
    type: Number,
    example: 4000,
    description: 'Цена товара на момент добавления в корзину',
  })
  productPrice: number;

  @ApiPropertyOptional({
    type: Number,
    example: 12.5,
    description: 'Процент скидки у товара на момент добавления в корзину',
  })
  productDiscount: number | null;

  @DocsClass(ProductInMyCart)
  product: ProductInMyCart;
}
