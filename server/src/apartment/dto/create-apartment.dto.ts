import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  IsFiles,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class CreateApartmentDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the apartment unit',
    example: 'Luxury Studio',
  })
  unitName: string;

  @ApiProperty({
    description: 'Unit number identifier',
    example: 'A101',
  })
  @IsString()
  unitNumber: string;

  @ApiProperty({
    description: 'Name of the project/building',
    example: 'Skyline Towers',
  })
  @IsString()
  projectName: string;

  @ApiPropertyOptional({
    description: 'Description of the apartment',
    example: 'Beautiful modern apartment with city view',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Monthly rent price',
    example: 1200,
    type: 'number',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 2,
    type: 'integer',
    minimum: 0,
  })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  bedrooms: number;

  @ApiProperty({
    description: 'Number of bathrooms',
    example: 1,
    type: 'integer',
    minimum: 0,
  })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  bathrooms: number;

  @ApiPropertyOptional({
    description: 'Area in square meters',
    example: 85.5,
    type: 'number',
    minimum: 0,
  })
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  areaSqm?: number;

  @ApiPropertyOptional({
    description: 'Location/address of the apartment',
    example: '123 Main Street, Downtown',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'Primary image of the apartment',
    type: 'string',
    format: 'binary',
  })
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  primaryImage: MemoryStoredFile;

  @IsOptional()
  @IsFiles()
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  optionalImages?: MemoryStoredFile[];
}
