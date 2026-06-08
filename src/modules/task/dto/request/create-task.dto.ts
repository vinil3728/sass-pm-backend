import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    Min,
    IsInt
} from 'class-validator';

import { TaskPriority }
    from '../../enums/task-priority.enum';

import { TaskType }
    from '../../enums/task-type.enum';

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUUID()
    sprintId?: string;

    @IsOptional()
    @IsUUID()
    assigneeId?: string;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @IsOptional()
    @IsEnum(TaskType)
    type?: TaskType;

    @IsOptional()
    @IsInt()
    @Min(0)
    storyPoints?: number;
}