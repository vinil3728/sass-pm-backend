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

  async findById(
    id: string
  ): Promise<UserSession | null> {
    return UserSession.findByPk(id);
  }

  async revokeSession(
    sessionId: string
  ): Promise<void> {
    const session =
      await UserSession.findByPk(sessionId);

    if (session) {
      await session.destroy();
    }
  }

  async revokeAllSessions(
    userId: string
  ): Promise<void> {
    await UserSession.destroy({
      where: {
        userId,
      },
    });
  }

  async findSessionsByUserId(
    userId: string
  ): Promise<UserSession[]> {
    return UserSession.findAll({
      where: {
        userId,
      },
      order: [
        ['createdAt', 'DESC']
      ],
    });
  }
}