import { ProjectRepository }
    from '../repositories/project.repository';

import { ProjectStatus }
    from '../enums/project-status.enum';

export class ProjectService {
    constructor(
        private readonly projectRepository =
            new ProjectRepository()
    ) { }

    async createProject(
        organizationId: string,
        userId: string,
        data: {
            name: string;
            key: string;
            description?: string;
            startDate?: Date;
            endDate?: Date;
        }
    ) {

        const existingProject =
            await this.projectRepository.findByKey(
                organizationId,
                data.key.toUpperCase()
            );

        if (existingProject) {
            throw new Error(
                'Project key already exists'
            );
        }

        return this.projectRepository.create({
            organizationId,
            name: data.name,
            key: data.key.toUpperCase(),
            description: data.description,
            status: ProjectStatus.PLANNING,
            createdBy: userId,
            startDate: data.startDate,
            endDate: data.endDate,
        });
    }

    async getProjects(
        organizationId: string
    ) {
        return this.projectRepository
            .findByOrganizationId(
                organizationId
            );
    }

    async getProject(
        projectId: string
    ) {
        const project =
            await this.projectRepository
                .findWithOrganization(
                    projectId
                );

        if (!project) {
            throw new Error(
                'Project not found'
            );
        }

        return project;
    }
}