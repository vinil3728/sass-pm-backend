import { RefreshToken } from '../models/refresh-token.model';

export class RefreshTokenRepository {
    async create(
        tokenData: Partial<RefreshToken>
    ): Promise<RefreshToken> {
        return RefreshToken.create(tokenData);
    }

    async findByTokenHash(
        tokenHash: string
    ): Promise<RefreshToken | null> {
        return RefreshToken.findOne({
            where: {
                tokenHash,
            },
        });
    }

    async revoke(id: string): Promise<void> {
        await RefreshToken.update(
            {
                revokedAt: new Date(),
            },
            {
                where: {
                    id,
                },
            }
        );
    }

    async findActiveToken(
        tokenHash: string
    ): Promise<RefreshToken | null> {
        return RefreshToken.findOne({
            where: {
                tokenHash,
                revokedAt: null,
            },
        });
    }

    async revokeBySessionId(
        sessionId: string
    ): Promise<void> {
        await RefreshToken.update(
            {
                revokedAt: new Date(),
            },
            {
                where: {
                    sessionId,
                },
            }
        );
    }
}