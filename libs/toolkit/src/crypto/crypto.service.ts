import * as crypto from 'crypto';
import { Global, Inject, Injectable } from '@nestjs/common';
import { CRYPTO_ALGORITHM, CRYPTO_SECRET } from './crypto.constants';

export type TextEncrypt = {
  iv: string;
  content: string;
};

@Global()
@Injectable()
export class CryptoService {
  constructor(
    @Inject(CRYPTO_SECRET) private readonly secret,
    @Inject(CRYPTO_ALGORITHM) private readonly algorithm,
  ) {}

  encrypt(text: string): TextEncrypt {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secret, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    };
  }

  decrypt(hash: TextEncrypt) {
    const decipher = crypto.createDecipheriv(this.algorithm, this.secret, Buffer.from(hash.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrypted.toString();
  }
}
