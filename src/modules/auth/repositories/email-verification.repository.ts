import { EmailVerification } from '../models/email-verification.model';

export class EmailVerificationRepository {
  async create(
    data: Partial<EmailVerification>
  ): Promise<EmailVerification> {
    return EmailVerification.create(data);
  }
}