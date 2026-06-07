import { UserProfile } from '../models/user-profile.model';

export class UserProfileRepository {
    async create(
        profileData: Partial<UserProfile>
    ): Promise<UserProfile> {
        return UserProfile.create(profileData);
    }

    async findByUserId(
        userId: string
    ): Promise<UserProfile | null> {
        return UserProfile.findOne({
            where: {
                userId,
            },
        });
    }
}