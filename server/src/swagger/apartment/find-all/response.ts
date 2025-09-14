import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

interface ResponseBody {
  success: ApiResponseOptions;
  error: {
    [statusCode: number]: ApiResponseOptions;
  };
}

export const GetAllApartments: ResponseBody = {
  success: {
    status: HttpStatus.OK,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          unitName: { type: 'string', example: '2-Bedroom Deluxe' },
          unitNumber: { type: 'string', example: 'A-101' },
          projectName: { type: 'string', example: 'Sunset Towers' },
          description: { type: 'string', nullable: true, example: null },
          price: { type: 'string', example: '1500000' },
          bedrooms: { type: 'number', example: 2 },
          bathrooms: { type: 'number', example: 1 },
          areaSqm: { type: 'string', example: '900' },
          location: { type: 'string', example: 'Downtown Cairo' },
          primaryImage: { type: 'string', example: 'primary.jpg' },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-09-12T15:37:08.016Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-09-12T15:37:08.016Z',
          },
        },
      },
    },
  },
  error: {
    [HttpStatus.INTERNAL_SERVER_ERROR]: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
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
