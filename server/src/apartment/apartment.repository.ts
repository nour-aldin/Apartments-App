import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateApartmentDto } from './dto';

@Injectable()
export class ApartmentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createApartmentDto: Omit<
      CreateApartmentDto,
      'primaryImage' | 'optionalImages'
    >,
  ) {
    return this.prismaService.apartment.create({ data: createApartmentDto });
  }

  async createApartmentImages(
    id: number,
    primaryImage: string,
    optionalImages: string[],
  ) {
    return this.prismaService.apartment.update({
      where: { id },
      data: {
        primaryImage,
        images: {
          createMany: {
            data: optionalImages.map((imageUrl) => ({
              imageUrl,
            })),
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.apartment.findMany({});
  }

  getById(id: number) {
    return this.prismaService.apartment.findUnique({ where: { id } });
  }

  getByIdIncludingDetails(id: number) {
    return this.prismaService.apartment.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });
  }
}
