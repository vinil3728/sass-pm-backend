import { Sprint } from '../models/sprint.model';

export class SprintRepository {

    async create(
        data: Partial<Sprint>
    ): Promise<Sprint> {
        return Sprint.create(data);
    }

    async findByProjectId(
        projectId: string
    ): Promise<Sprint[]> {
        return Sprint.findAll({
            where: {
                projectId,
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
    }

    async findById(
        id: string
    ): Promise<Sprint | null> {
        return Sprint.findByPk(id);
    }
}