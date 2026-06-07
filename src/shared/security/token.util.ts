import crypto from 'crypto';

export class TokenUtil {
  static generateToken(
    length = 64
  ): string {
    return crypto
      .randomBytes(length)
      .toString('hex');
  }
}