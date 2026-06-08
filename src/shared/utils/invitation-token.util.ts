import crypto from 'crypto';

export class InvitationTokenUtil {
    static generate(): string {
        return crypto.randomBytes(32)
            .toString('hex');
    }
}