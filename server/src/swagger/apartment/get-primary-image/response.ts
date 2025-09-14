import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

interface ResponseBody {
  success: ApiResponseOptions;
  error: {
    [statusCode: number]: ApiResponseOptions;
  };
}

export const GetPrimaryImage: ResponseBody = {
  success: {
    status: HttpStatus.OK,
    description: 'Primary image retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          example: 'images/apartments/1/primary.jpg',
        },
        fileName: {
          type: 'string',
          example: 'primary.jpg',
        },
        mimeType: {
          type: 'string',
          example: 'image/jpeg',
        },
      },
    },
  },
  error: {
    [HttpStatus.NOT_FOUND]: {
      status: HttpStatus.NOT_FOUND,
      description: 'Apartment not found',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Apartment with id = 1 not found',
          },
          error: { type: 'string', example: 'Not Found' },
          statusCode: {
            type: 'number',
            example: HttpStatus.NOT_FOUND,
          },
        },
      },
    },
    [HttpStatus.UNPROCESSABLE_ENTITY]: {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'File not found or processing error',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'Failed to read file located at images/apartments/1/primary.jpg',
          },
          error: { type: 'string', example: 'Unprocessable Entity' },
          statusCode: {
            type: 'number',
            example: HttpStatus.UNPROCESSABLE_ENTITY,
          },
        },
      },
    },
    [HttpStatus.INTERNAL_SERVER_ERROR]: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
      schema: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Internal Server Error' },
          statusCode: {
            type: 'number',
            example: HttpStatus.INTERNAL_SERVER_ERROR,
          },
        },
      },
    },
  },
};
