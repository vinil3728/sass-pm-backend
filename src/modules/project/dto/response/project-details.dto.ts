export class ProjectDetailsDto {
    id!: string;
    name!: string;
    key!: string;
    description?: string;
    status!: string;
    startDate?: Date;
    endDate?: Date;
    createdAt!: Date;
}