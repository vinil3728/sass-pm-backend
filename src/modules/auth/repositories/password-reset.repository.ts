import { PasswordReset } from '../models/password-reset.model';

export class PasswordResetRepository {
  async create(
    data: Partial<PasswordReset>
  ): Promise<PasswordReset> {
    return PasswordReset.create(data);
  }
}