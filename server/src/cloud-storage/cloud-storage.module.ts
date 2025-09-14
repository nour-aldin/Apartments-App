import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LocalStorageService } from './local-storage/local-storage.service';
import { CLOUD_STORAGE_SERVICES } from '../common/constants/custom-provider-tokens';

@Module({
  providers: [
    {
      provide: CLOUD_STORAGE_SERVICES,
      useFactory: (configService: ConfigService) => {
        const storageType = configService.get<string>('STORAGE_TYPE');

        switch (storageType) {
          case 'local':
            return new LocalStorageService();
          // Add other providers here .....
          default:
            return new LocalStorageService();
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [CLOUD_STORAGE_SERVICES],
})
export class CloudStorageModule {}
