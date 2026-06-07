import { UserRepository } from '../repositories/user.repository';
import { UserProfileRepository } from '../repositories/user-profile.repository';
import { UserSessionRepository } from '../repositories/user-session.repository';

import { PasswordUtil } from '../../../shared/utils/security/password.util';
import { JwtUtil } from '../../../shared/utils/security/jwt.util';
import { HashUtil } from '../../../shared/utils/security/hash.util';

import { User } from '../models/user.model';

export class AuthService {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly userProfileRepository = new UserProfileRepository(),
    private readonly userSessionRepository = new UserSessionRepository()
  ) {}

  // -------------------------
  // REGISTER USER
  // -------------------------
  async register(input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const existingUser = await this.userRepository.findByEmail(
      input.email
    );

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await PasswordUtil.hash(
      input.password
    );

    const user = await this.userRepository.create({
      email: input.email,
      passwordHash: hashedPassword,
      isEmailVerified: false,
    });

    await this.userProfileRepository.create({
      userId: user.id,
      firstName: input.firstName,
      lastName: input.lastName,
    });

    const payload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken =
      JwtUtil.generateAccessToken(payload);

    const refreshToken =
      JwtUtil.generateRefreshToken(payload);

    await this.userSessionRepository.create({
      userId: user.id,
      ipAddress: '',
      userAgent: '',
      deviceName: '',
      lastActiveAt: new Date(),
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  // -------------------------
  // LOGIN USER
  // -------------------------
  async login(input: {
    email: string;
    password: string;
  }) {
    const user = await this.userRepository.findByEmail(
      input.email
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid =
      await PasswordUtil.compare(
        input.password,
        user.passwordHash
      );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken =
      JwtUtil.generateAccessToken(payload);

    const refreshToken =
      JwtUtil.generateRefreshToken(payload);

    await this.userSessionRepository.create({
      userId: user.id,
      ipAddress: '',
      userAgent: '',
      deviceName: '',
      lastActiveAt: new Date(),
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}