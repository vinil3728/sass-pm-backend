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
}