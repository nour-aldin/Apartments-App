import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { ApartmentRepository } from './apartment.repository';
import { CloudStorageModule } from '../cloud-storage/cloud-storage.module';

@Module({
  imports: [CloudStorageModule],
  controllers: [ApartmentController],
  providers: [ApartmentService, ApartmentRepository],
})
export class ApartmentModule {}
