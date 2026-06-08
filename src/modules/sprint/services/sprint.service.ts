import { SprintStatus } from '../enums/sprint-status.enum';
import { SprintRepository }
    from '../repositories/sprint.repository';

export class SprintService {

    private readonly sprintRepository =
        new SprintRepository();

    async createSprint(
        projectId: string,
        userId: string,
        data: {
            name: string;
            goal?: string;
            startDate: Date;
            endDate: Date;
        }
    ) {

        if (
            new Date(data.endDate) <=
            new Date(data.startDate)
        ) {
            throw new Error(
                'End date must be after start date'
            );
        }

        return this.sprintRepository.create({
            projectId,
            name: data.name,
            goal: data.goal,
            startDate: data.startDate,
            endDate: data.endDate,
            createdBy: userId,
        });
    }

    async startSprint(
        sprintId: string
    ) {

        const sprint =
            await this.sprintRepository
                .findById(sprintId);

        if (!sprint) {
            throw new Error(
                'Sprint not found'
            );
        }

        if (
            sprint.status !==
            SprintStatus.PLANNED
        ) {
            throw new Error(
                'Only planned sprints can be started'
            );
        }

        const activeSprint =
            await this.sprintRepository
                .findByProjectAndStatus(
                    sprint.projectId,
                    SprintStatus.ACTIVE
                );

        if (activeSprint) {
            throw new Error(
                'Project already has an active sprint'
            );
        }

        await this.sprintRepository
            .updateStatus(
                sprintId,
                SprintStatus.ACTIVE
            );

        return {
            success: true,
        };
    }

    async completeSprint(
        sprintId: string
    ) {

        const sprint =
            await this.sprintRepository
                .findById(sprintId);

        if (!sprint) {
            throw new Error(
                'Sprint not found'
            );
        }

        if (
            sprint.status !==
            SprintStatus.ACTIVE
        ) {
            throw new Error(
                'Only active sprints can be completed'
            );
        }

        await this.sprintRepository
            .updateStatus(
                sprintId,
                SprintStatus.COMPLETED
            );

        return {
            success: true,
        };
    }

    async cancelSprint(
        sprintId: string
    ) {

        const sprint =
            await this.sprintRepository
                .findById(sprintId);

        if (!sprint) {
            throw new Error(
                'Sprint not found'
            );
        }

        if (
            sprint.status !==
            SprintStatus.PLANNED
        ) {
            throw new Error(
                'Only planned sprints can be cancelled'
            );
        }

        await this.sprintRepository
            .updateStatus(
                sprintId,
                SprintStatus.CANCELLED
            );

        return {
            success: true,
        };
    }
}