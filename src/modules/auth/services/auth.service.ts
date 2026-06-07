import { UserRepository } from '../repositories/user.repository';
import { UserProfileRepository } from '../repositories/user-profile.repository';
import { UserSessionRepository } from '../repositories/user-session.repository';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';

import { PasswordUtil } from '../../../shared/utils/security/password.util';
import { JwtUtil } from '../../../shared/utils/security/jwt.util';
import { HashUtil } from '../../../shared/utils/security/hash.util';

import { User } from '../models/user.model';
import { UnauthorizedError } from '../../../shared/errors/unauthorized.error';
import { BadRequestError } from '../../../shared/errors/bad-request.error';

import { AuditLogRepository } from '../repositories/audit-log.repository';

export class AuthService {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly userProfileRepository = new UserProfileRepository(),
    private readonly userSessionRepository = new UserSessionRepository(),
    private readonly auditRepo = new AuditLogRepository(),
    private readonly refreshTokenRepository = new RefreshTokenRepository()
  ) { }

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
      throw new BadRequestError('User already exists');
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

    const tokenHash =
      HashUtil.sha256(refreshToken);

    const session = await this.userSessionRepository.create({
      userId: user.id,
      ipAddress: '',
      userAgent: '',
      deviceName: '',
      lastActiveAt: new Date(),
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    await this.refreshTokenRepository.create({
      userId: user.id,
      sessionId: session.id,
      tokenHash,
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
    ipAddress?: string;
    userAgent?: string;
  }) {
    const user = await this.userRepository.findByEmail(
      input.email
    );

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isPasswordValid =
      await PasswordUtil.compare(
        input.password,
        user.passwordHash
      );

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken =
      JwtUtil.generateAccessToken(payload);

    const refreshToken =
      JwtUtil.generateRefreshToken(payload);

    const tokenHash =
      HashUtil.sha256(refreshToken);

    const session = await this.userSessionRepository.create({
      userId: user.id,
      ipAddress: '',
      userAgent: '',
      deviceName: '',
      lastActiveAt: new Date(),
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    await this.refreshTokenRepository.create({
      userId: user.id,
      sessionId: session.id,
      tokenHash,
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

  async refreshToken(
    refreshToken: string
  ) {
    const tokenHash =
      HashUtil.sha256(refreshToken);

    const storedToken =
      await this.refreshTokenRepository.findActiveToken(
        tokenHash
      );

    if (!storedToken) {
      throw new UnauthorizedError(
        'Invalid refresh token'
      );
    }

    const payload =
      JwtUtil.verifyRefreshToken(refreshToken);

    await this.refreshTokenRepository.revoke(
      storedToken.id
    );

    const newAccessToken =
      JwtUtil.generateAccessToken({
        userId: payload.userId,
        email: payload.email,
      });

    const newRefreshToken =
      JwtUtil.generateRefreshToken({
        userId: payload.userId,
        email: payload.email,
      });

    const newHash =
      HashUtil.sha256(newRefreshToken);

    await this.refreshTokenRepository.create({
      userId: payload.userId,
      sessionId: storedToken.sessionId,
      tokenHash: newHash,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(
    refreshToken: string
  ): Promise<void> {
    const tokenHash =
      HashUtil.sha256(refreshToken);

    const storedToken =
      await this.refreshTokenRepository.findActiveToken(
        tokenHash
      );

    if (!storedToken) {
      throw new UnauthorizedError(
        'Invalid refresh token'
      );
    }

    await this.refreshTokenRepository.revoke(
      storedToken.id
    );

    await this.userSessionRepository.revokeSession(
      storedToken.sessionId
    );
  }

  async logoutAllDevices(
    userId: string
  ): Promise<void> {
    const sessions =
      await this.userSessionRepository.findActiveSessions(
        userId
      );

    for (const session of sessions) {
      await this.refreshTokenRepository.revokeBySessionId(
        session.id
      );
    }

    await this.userSessionRepository.revokeAllSessions(
      userId
    );
  }
}