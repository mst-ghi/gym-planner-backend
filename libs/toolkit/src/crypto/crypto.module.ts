import { Global, Module } from '@nestjs/common';
import { CipherGCMTypes, CryptoDefaultConfig } from './crypto.config';
import { CRYPTO_ALGORITHM, CRYPTO_SECRET } from './crypto.constants';
import { CryptoService } from './crypto.service';

@Global()
@Module({})
export class CryptoModule {
  static register(options?: { secret?: string; algorithm?: CipherGCMTypes }) {
    const secret = options?.secret || CryptoDefaultConfig.secret;
    const algorithm = options?.algorithm || CryptoDefaultConfig.algorithm;

    return {
      module: CryptoModule,
      providers: [
        {
          useFactory: () => {
            return secret;
          },
          provide: CRYPTO_SECRET,
        },
        {
          useFactory: () => {
            return algorithm;
          },
          provide: CRYPTO_ALGORITHM,
        },
        CryptoService,
      ],
      exports: [CryptoService, CRYPTO_SECRET, CRYPTO_ALGORITHM],
    };
  }
}
