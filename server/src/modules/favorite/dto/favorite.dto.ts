import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsUUID, IsEnum, IsOptional } from '@common/decorators';

import { FavoriteEnum } from '@modules/favorite/enums';

import { ID } from '@common/types';

export class Favorite {
  @IsUUID()
  @ApiProperty({
    type: String,
    example: '7408b666-6596-4d71-ab58-836a90202542',
  })
  productId: ID;

  @IsEnum(FavoriteEnum)
  @IsOptional()
  @ApiPropertyOptional({
    type: FavoriteEnum,
    example: FavoriteEnum.productPage,
    default: FavoriteEnum.catalog,
    description:
      'В зависимости от типа возвращается полная или не полная модель продукта',
  })
  type = FavoriteEnum.catalog;
}
