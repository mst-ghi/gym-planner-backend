export type CipherCCMTypes = 'aes-128-ccm' | 'aes-192-ccm' | 'aes-256-ccm' | 'chacha20-poly1305';
export type CipherGCMTypes = 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm';
export type CipherOCBTypes = 'aes-128-ocb' | 'aes-192-ocb' | 'aes-256-ocb';

export type CryptoConfigType = {
  secret: string;
  algorithm: CipherGCMTypes | CipherCCMTypes | CipherOCBTypes | string;
};

export const CryptoDefaultConfig: CryptoConfigType = {
  secret: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3',
  algorithm: 'aes-256-ctr',
};
