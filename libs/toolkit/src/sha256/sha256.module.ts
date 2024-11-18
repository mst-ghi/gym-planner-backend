import { Global, Module } from '@nestjs/common';
import { Sha256DefaultConfig } from './sha256.configs';
import { Sha256Service } from './sha256.service';
import { SHA256_PREFIX, SHA256_SUFFIX, SHA256_SECRET } from './sha256.constants';

@Global()
@Module({})
export class Sha256Module {
  static register(options?: { secret?: string; prefix?: string; suffix?: string }) {
    const secret = options?.secret || Sha256DefaultConfig.secret;
    let prefix = '';
    let suffix = '';

    try {
      prefix = options?.prefix || secret.split('.')[0];
    } catch (error) {
      console.log(error.message);
      prefix = '';
    }

    try {
      suffix = options?.suffix || secret.split('.')[1];
    } catch (error) {
      console.log(error.message);
      suffix = '';
    }

    return {
      module: Sha256Module,
      providers: [
        {
          useFactory: () => {
            return secret;
          },
          provide: SHA256_SECRET,
        },
        {
          useFactory: () => {
            return prefix;
          },
          provide: SHA256_PREFIX,
        },
        {
          useFactory: () => {
            return suffix;
          },
          provide: SHA256_SUFFIX,
        },
        Sha256Service,
      ],
      exports: [Sha256Service, SHA256_SECRET, SHA256_PREFIX, SHA256_SUFFIX],
    };
  }
}
