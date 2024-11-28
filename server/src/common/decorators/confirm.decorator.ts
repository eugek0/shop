import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';

export const Confirm = () =>
  applyDecorators(
    ApiHeader({
      name: 'Cookie',
      required: true,
      description:
        'Token containing information about the candidate for confirmation of registration',
    }),
    ApiResponse({
      description: 'Invalid confirm token',
      status: HttpStatus.FORBIDDEN,
    }),
  );
