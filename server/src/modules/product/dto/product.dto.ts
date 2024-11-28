import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from '@common/decorators';
import { OrderEnum } from '@modules/product/enums';
import { Transform } from 'class-transformer';

export class FilterDto {
  @ApiPropertyOptional({
    type: String,
    example: 'Charisme Sport',
  })
  @IsOptional()
  @IsString()
  title = '';

  @ApiPropertyOptional({
    type: String,
    example: '49a37307-96cc-49fd-9eff-5e287e6d805',
  })
  @IsOptional()
  @IsUUID()
  typeId: null | string = null;

  @ApiPropertyOptional({
    type: String,
    example: '49a37307-96cc-49fd-9eff-5e287e6d805',
  })
  @IsOptional()
  @IsUUID()
  colorId: null | string = null;

  @ApiPropertyOptional({
    type: String,
    example: '49a37307-96cc-49fd-9eff-5e287e6d805',
  })
  @IsOptional()
  @IsUUID()
  genderId: null | string = null;

  @ApiPropertyOptional({
    type: String,
    example: '49a37307-96cc-49fd-9eff-5e287e6d805',
  })
  @IsOptional()
  @IsUUID()
  volumeId: null | string = null;

  @ApiPropertyOptional({
    type: String,
    example: '49a37307-96cc-49fd-9eff-5e287e6d805',
  })
  @IsOptional()
  @IsUUID()
  motiveId: null | string = null;

  @ApiPropertyOptional({
    type: Number,
    example: 500,
    default: 'Устанавливается максимальная стоимость',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === null ? value : Number(value)))
  maxPrice: null | number = null;

  @ApiPropertyOptional({
    type: Number,
    example: 0,
    default: 0,
  })
  @IsOptional({ isNull: false })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  minPrice = 0;

  @ApiPropertyOptional({
    type: Number,
    example: 10,
    default: 10,
  })
  @IsOptional({ isNull: false })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit = 10;

  @ApiPropertyOptional({
    type: Number,
    example: 1,
    default: 1,
  })
  @IsOptional({ isNull: false })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page = 1;

  @ApiPropertyOptional({
    type: String,
    example: OrderEnum.DOWN_PRICE,
    default: OrderEnum.DOWN_PRICE,
  })
  @IsOptional({ isNull: false })
  @IsEnum(OrderEnum)
  order: OrderEnum = OrderEnum.DEFAULT;

  @ApiPropertyOptional({
    type: Boolean,
    example: true,
    default: false,
  })
  @IsOptional({ isNull: false })
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  isDiscount = false;
}
