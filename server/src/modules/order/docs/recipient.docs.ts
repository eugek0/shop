import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ID } from '@common/types';

export class DRecipient {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({
    type: String,
    example: 'Иван',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Иванов',
  })
  lastName: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Иванович',
  })
  middleName: string;

  @ApiProperty({
    type: String,
    example: 'ivan@email.ru',
  })
  email: string;

  @ApiPropertyOptional({ type: String, example: '+7 (999) 999-99-99' })
  phone: string;
}
