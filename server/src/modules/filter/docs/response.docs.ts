import { ApiProperty } from '@nestjs/swagger';
import { OrderEnum } from '@modules/product/enums';

class RIdResponse {
  @ApiProperty({
    type: String,
    example: '0ff18aae-2d2d-4bdf-a94c-2570fe03ddd9',
  })
  id: string;
}

export class RPricesFilter {
  @ApiProperty({
    type: Number,
    example: 250,
  })
  min: number;

  @ApiProperty({
    type: Number,
    example: 4000,
  })
  max: number;
}

export class RColorsResponse extends RIdResponse {
  @ApiProperty({
    type: String,
    example: 'СИНИЙ',
  })
  title: string;
}

export class RTypesResponse extends RIdResponse {
  @ApiProperty({
    type: String,
    example: 'ГУРМАНСКИЙ',
  })
  title: string;
}

export class RGendersResponse extends RIdResponse {
  @ApiProperty({
    type: String,
    example: 'ЖЕНЩИНАМ',
  })
  title: string;
}

export class RMotivesResponse extends RIdResponse {
  @ApiProperty({
    type: String,
    example: 'По мотивам Chanel Allure Homme Sport',
  })
  title: string;
}

export class RVolumesResponse extends RIdResponse {
  @ApiProperty({
    type: String,
    example: '60 ML',
  })
  title: string;
}

export class OrderDto {
  @ApiProperty({
    type: String,
    example: 'up_price',
  })
  id: OrderEnum;

  @ApiProperty({
    type: String,
    example: 'По возрастанию цены',
  })
  title: string;
}
