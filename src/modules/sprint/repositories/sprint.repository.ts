import { SprintStatus } from '../enums/sprint-status.enum';
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

    async findActiveSprint(
        projectId: string
    ): Promise<Sprint | null> {

        return Sprint.findOne({
            where: {
                projectId,
                status: SprintStatus.ACTIVE,
            },
        });
    }

    async updateStatus(
        sprintId: string,
        status: SprintStatus
    ): Promise<void> {

        await Sprint.update(
            { status },
            {
                where: {
                    id: sprintId,
                },
            }
        );
    }

    async findByProjectAndStatus(
        projectId: string,
        status: SprintStatus
    ): Promise<Sprint | null> {

        return Sprint.findOne({
            where: {
                projectId,
                status,
            },
        });
    }

    async findWithProject(
        sprintId: string
    ): Promise<Sprint | null> {

        return Sprint.findByPk(
            sprintId,
            {
                include: [
                    {
                        association: 'project',
                    },
                ],
            }
        );
    }
}