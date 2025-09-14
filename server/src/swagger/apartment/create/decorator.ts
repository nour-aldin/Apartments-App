import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateApartment } from './response';

export function ApiCreateApartment() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create new Apartment',
      description: 'Create New Apartment, including images.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiResponse(CreateApartment.success),
    ApiResponse(CreateApartment.error[HttpStatus.INTERNAL_SERVER_ERROR]),
    ApiResponse(CreateApartment.error[HttpStatus.UNSUPPORTED_MEDIA_TYPE]),
    ApiResponse(CreateApartment.error[HttpStatus.INTERNAL_SERVER_ERROR]),
  );
}
