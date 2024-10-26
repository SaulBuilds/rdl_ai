// src/modules/utils/tokenEncryptor.ts

import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';

export function encryptToken(token: string): string {
  const cipher = crypto.createCipher(algorithm, secretKey);
  return cipher.update(token, 'utf8', 'hex') + cipher.final('hex');
}

export function decryptToken(encryptedToken: string): string {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  return decipher.update(encryptedToken, 'hex', 'utf8') + decipher.final('utf8');
}
