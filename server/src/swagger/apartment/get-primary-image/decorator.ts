import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetPrimaryImage } from './response';

export function ApiGetPrimaryImage() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Primary Image',
      description: 'Retrieves the primary image of an apartment by its ID.',
    }),
    ApiParam({
      name: 'id',
      type: 'number',
      description: 'The ID of the apartment',
      example: 1,
    }),
    ApiResponse(GetPrimaryImage.success),
    ApiResponse(GetPrimaryImage.error[HttpStatus.NOT_FOUND]),
    ApiResponse(GetPrimaryImage.error[HttpStatus.UNPROCESSABLE_ENTITY]),
    ApiResponse(GetPrimaryImage.error[HttpStatus.INTERNAL_SERVER_ERROR]),
  );
}
