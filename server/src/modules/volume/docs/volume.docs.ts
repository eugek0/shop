import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MVolume } from '@modules/volume/models';

export class DVolume {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: MVolume['id'];

  @ApiPropertyOptional({
    type: String,
    example: '60 ML',
  })
  title: MVolume['id'];
}
