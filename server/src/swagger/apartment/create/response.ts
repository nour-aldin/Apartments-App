import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

interface ResponseBody {
  success: ApiResponseOptions;
  error: {
    [statusCode: number]: ApiResponseOptions;
  };
}

export const CreateApartment: ResponseBody = {
  success: {
    status: HttpStatus.CREATED,
    description: 'Apartment created successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1,
        },
        unitName: {
          type: 'string',
          example: 'Luxury Studio',
        },
        unitNumber: {
          type: 'string',
          example: 'A101',
        },
        projectName: {
          type: 'string',
          example: 'Skyline Towers',
        },
        description: {
          type: 'string',
          example: 'Beautiful modern apartment with city view',
        },
        price: {
          type: 'number',
          example: 1200,
        },
        bedrooms: {
          type: 'number',
          example: 2,
        },
        bathrooms: {
          type: 'number',
          example: 1,
        },
        areaSqm: {
          type: 'number',
          example: 85.5,
        },
        location: {
          type: 'string',
          example: '123 Main Street, Downtown',
        },
        primaryImage: {
          type: 'string',
          example: 'images/apartments/1/primary.jpg',
        },
        images: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: [
            'images/apartments/1/optional_1.jpg',
            'images/apartments/1/optional_2.jpg',
          ],
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2023-09-14T10:30:00Z',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2023-09-14T10:30:00Z',
        },
      },
    },
  },
  error: {
    [HttpStatus.BAD_REQUEST]: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data or file format',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: [
              'unitName should not be empty',
              'price must be a positive number',
              'primaryImage must be a valid image file (jpeg/png)',
              'bedrooms must be a number',
            ],
          },
          error: {
            type: 'string',
            example: 'Bad Request',
          },
          statusCode: {
            type: 'number',
            example: HttpStatus.BAD_REQUEST,
          },
        },
      },
    },
    [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: {
      status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      description: 'Unsupported file type',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Only JPEG and PNG images are allowed',
          },
          error: {
            type: 'string',
            example: 'Unsupported Media Type',
          },
          statusCode: {
            type: 'number',
            example: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
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
          error: {
            type: 'string',
            example: 'Internal Server Error',
          },
          statusCode: {
            type: 'number',
            example: HttpStatus.INTERNAL_SERVER_ERROR,
          },
        },
      },
    },
  },
};
