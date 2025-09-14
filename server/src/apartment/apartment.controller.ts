import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto';
import { ApiFindAllApartments, ApiGetPrimaryImage } from '../swagger/apartment';
import { ApiConsumes } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { ApiGetImages } from '../swagger/apartment/get-images';
import { ApiFindApartment } from '../swagger/apartment/find-one';
import { ApiCreateApartment } from '../swagger/apartment/create';

@Controller('apartments')
@ApiConsumes('Apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  @FormDataRequest()
  @ApiCreateApartment()
  create(@Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentService.create(createApartmentDto);
  }

  @Get()
  @ApiFindAllApartments()
  findAll() {
    return this.apartmentService.findAll();
  }

  @Get(':id/primary-image')
  @ApiGetPrimaryImage()
  getPrimaryImage(@Param('id') id: string) {
    return this.apartmentService.getPrimaryImage(+id);
  }

  @Get(':id/images')
  @ApiGetImages()
  getImages(@Param('id') id: string) {
    return this.apartmentService.getImages(+id);
  }

  @Get(':id')
  @ApiFindApartment()
  findOne(@Param('id') id: string) {
    return this.apartmentService.findOne(+id);
  }
}
