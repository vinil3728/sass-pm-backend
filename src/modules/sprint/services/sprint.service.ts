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

        return this.sprintRepository.create({
            projectId,
            name: data.name,
            goal: data.goal,
            startDate: data.startDate,
            endDate: data.endDate,
            createdBy: userId,
        });
    }
}