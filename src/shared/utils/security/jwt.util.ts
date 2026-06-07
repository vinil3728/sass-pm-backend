import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

export class JwtUtil {
  static generateAccessToken(
    payload: JwtPayload
  ): string {
    const secret: Secret = process.env['JWT_ACCESS_SECRET']!;

    const options: SignOptions = {
      expiresIn: '15m',
    };

    return jwt.sign(payload, secret, options);
  }

  static generateRefreshToken(
    payload: JwtPayload
  ): string {
    const secret: Secret = process.env['JWT_REFRESH_SECRET']!;

    const options: SignOptions = {
      expiresIn: '7d',
    };

    return jwt.sign(payload, secret, options);
  }

  static verifyAccessToken(
    token: string
  ): JwtPayload {
    return jwt.verify(
      token,
      process.env['JWT_ACCESS_SECRET']!
    ) as JwtPayload;
  }

  static verifyRefreshToken(
    token: string
  ): JwtPayload {
    return jwt.verify(
      token,
      process.env['JWT_REFRESH_SECRET']!
    ) as JwtPayload;
  }
}