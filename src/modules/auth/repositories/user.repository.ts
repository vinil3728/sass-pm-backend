import { User } from '../models/user.model';

export class UserRepository {
  async create(userData: Partial<User>): Promise<User> {
    return User.create(userData);
  }

  async findById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: {
        email,
      },
    });
  }

  async update(
    id: string,
    data: Partial<User>
  ): Promise<void> {
    await User.update(data, {
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const user = await User.findByPk(id);

    if (user) {
      await user.destroy();
    }
  }
}