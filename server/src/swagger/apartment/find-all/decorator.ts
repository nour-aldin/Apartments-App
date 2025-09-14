import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAllApartments } from './response';

export function ApiFindAllApartments() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get All Apartments',
      description: 'Retrieves All Apartments, including amenities and images.',
    }),
    ApiResponse(GetAllApartments.success),
    ApiResponse(GetAllApartments.error[HttpStatus.INTERNAL_SERVER_ERROR]),
  );
}
