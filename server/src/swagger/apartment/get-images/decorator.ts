import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetImages } from './response';

export function ApiGetImages() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Apartment Images',
      description: 'Retrieves apartment images by its ID.',
    }),
    ApiParam({
      name: 'id',
      type: 'number',
      description: 'The ID of the apartment',
      example: 1,
    }),
    ApiResponse(GetImages.success),
    ApiResponse(GetImages.error[HttpStatus.NOT_FOUND]),
    ApiResponse(GetImages.error[HttpStatus.UNPROCESSABLE_ENTITY]),
    ApiResponse(GetImages.error[HttpStatus.INTERNAL_SERVER_ERROR]),
  );
}
