import { DynamicModule, FactoryProvider, Global, Module, ModuleMetadata } from '@nestjs/common';
import { StorageService } from './storage.service';

import { DEFAULTS, STORAGE_CONFIGS } from './storage.constants';

export type StorageModuleConfigs = {
  accessKey: string;
  secretKey: string;
  bucketName: string;
  endPoint?: string;
  region?: string;
  mimes?: string;
  limitSize?: number;
};

@Global()
@Module({})
export class StorageModule {
  static register(configs: StorageModuleConfigs) {
    return {
      module: StorageModule,
      providers: [
        {
          useFactory: () => {
            return {
              accessKey: configs.accessKey,
              secretKey: configs.secretKey,
              bucketName: configs.bucketName,
              endPoint: configs.endPoint || DEFAULTS.END_POINT,
              region: configs.region || DEFAULTS.REGION,
              mimes: configs.mimes || DEFAULTS.MIMES,
              limitSize: configs.limitSize || DEFAULTS.LIMIT_SIZE,
            };
          },
          provide: STORAGE_CONFIGS,
        },
        StorageService,
      ],
      exports: [StorageService, STORAGE_CONFIGS],
    };
  }
}
