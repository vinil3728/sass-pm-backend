import { Project } from '../models/project.model';

export class ProjectRepository {
    async create(
        data: Partial<Project>
    ): Promise<Project> {
        return Project.create(data);
    }

    async findByKey(
        organizationId: string,
        key: string
    ): Promise<Project | null> {
        return Project.findOne({
            where: {
                organizationId,
                key,
            },
        });
    }

    async findById(
        id: string
    ): Promise<Project | null> {
        return Project.findByPk(id);
    }

    async findByOrganizationId(
        organizationId: string
    ): Promise<Project[]> {
        return Project.findAll({
            where: {
                organizationId,
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
    }

    async findWithOrganization(
        projectId: string
    ): Promise<Project | null> {
        return Project.findByPk(projectId, {
            include: [
                {
                    association: 'organization',
                },
            ],
        });
    }

    async findProjectWithOrganization(
        projectId: string
    ): Promise<Project | null> {
        return Project.findByPk(projectId);
    }
}