import { Module } from '@nestjs/common';
import { ApartmentModule } from './apartment/apartment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        return {
          prismaOptions: {
            datasources: {
              db: {
                url: configService.get<string>('DATABASE_URL'),
              },
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    NestjsFormDataModule.config({ isGlobal: true }),
    ApartmentModule,
  ],
})
export class AppModule {}
