import { UserSession } from '../models/user-session.model';

export class UserSessionRepository {
  async create(
    sessionData: Partial<UserSession>
  ): Promise<UserSession> {
    return UserSession.create(sessionData);
  }

  async findActiveSessions(
    userId: string
  ): Promise<UserSession[]> {
    return UserSession.findAll({
      where: {
        userId,
      },
    });
  }
}