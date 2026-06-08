import {
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength
} from 'class-validator';

export class CreateSprintDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    name!: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    goal?: string;

    @IsDateString()
    startDate!: Date;

    @IsDateString()
    endDate!: Date;
}