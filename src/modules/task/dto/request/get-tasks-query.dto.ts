import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    Max,
    Min
} from 'class-validator';

import { Type }
    from 'class-transformer';

import { TaskStatus }
    from '../../enums/task-status.enum';

import { TaskPriority }
    from '../../enums/task-priority.enum';

export class GetTasksQueryDto {

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit = 20;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @IsOptional()
    @IsUUID()
    assigneeId?: string;

    @IsOptional()
    @IsString()
    sortBy = 'createdAt';

    @IsOptional()
    @IsString()
    sortOrder = 'DESC';
}