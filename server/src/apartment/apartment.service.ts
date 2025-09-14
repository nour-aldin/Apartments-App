import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateApartmentDto } from './dto';
import { ApartmentRepository } from './apartment.repository';
import type { ICloudStorageService } from '../cloud-storage/cloud-storage.interface';
import { CLOUD_STORAGE_SERVICES } from '../common/constants/custom-provider-tokens';
import { randomUUID } from 'crypto';
import { omit } from 'lodash';
@Injectable()
export class ApartmentService {
  constructor(
    private readonly repository: ApartmentRepository,
    @Inject(CLOUD_STORAGE_SERVICES)
    private readonly cloudStorageService: ICloudStorageService,
  ) {}

  async create(createApartmentDto: CreateApartmentDto) {
    const { id: newApartmentId } = await this.repository.create(
      omit(createApartmentDto, ['primaryImage', 'optionalImages']),
    );

    const { primaryImage, optionalImages } = createApartmentDto;
    const primaryImagePath = `images/apartments/${newApartmentId}/primary.jpg`;
    await this.cloudStorageService.uploadFile(
      primaryImage.buffer,
      primaryImagePath,
    );

    const optionalImagesPaths: string[] = [];
    if (optionalImages?.length)
      for (const image of optionalImages) {
        const name = randomUUID();
        const path = `images/apartments/${newApartmentId}/${name}.jpg`;
        await this.cloudStorageService.uploadFile(image.buffer, path);
        optionalImagesPaths.push(`${name}.jpg`);
      }

    return this.repository.createApartmentImages(
      newApartmentId,
      'primary.jpg',
      optionalImagesPaths,
    );
  }

  findAll() {
    return this.repository.findAll();
  }

  async getPrimaryImage(id: number) {
    const apartment = await this.repository.getById(id);

    if (!apartment)
      throw new NotFoundException(`Apartment with id = ${id} not found`);

    const location = `images/apartments/${id}/${apartment.primaryImage}`;

    await this.cloudStorageService.validatePath(location);

    return {
      url: location,
      filename: apartment.primaryImage,
      mimeType: 'image/jpeg',
    };
  }

  async findOne(id: number) {
    const apartment = await this.repository.getById(id);

    if (!apartment)
      throw new NotFoundException(`Apartment with id = ${id} not found`);

    return apartment;
  }

  async getImages(id: number) {
    const apartment = await this.repository.getByIdIncludingDetails(id);

    if (!apartment)
      throw new NotFoundException(`Apartment with id = ${id} not found`);

    const locations: string[] = [
      `images/apartments/${id}/${apartment.primaryImage}`,
      ...apartment.images.map(
        (img) => `images/apartments/${id}/${img.imageUrl}`,
      ),
    ].filter((item) => item !== null);

    for (const location of locations)
      await this.cloudStorageService.validatePath(location);

    return locations;
  }
}
