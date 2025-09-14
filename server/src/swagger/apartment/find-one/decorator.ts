import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetApartment } from './response';

export function ApiFindApartment() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Apartment',
      description: 'Retrieve Apartment by its id.',
    }),
    ApiResponse(GetApartment.success),
    ApiResponse(GetApartment.error[HttpStatus.INTERNAL_SERVER_ERROR]),
  );
}
