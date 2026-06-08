import { Request } from 'express';

import { Project }
    from '../../modules/project/models/project.model';

import { OrganizationMember }
    from '../../modules/organization/models/organization-member.model';

import { Sprint } from '../../modules/sprint/models/sprint.model';

import { Task } from '../../modules/task/models/task.model';

export interface AuthenticatedRequest
    extends Request {

    user?: {
        userId: string;
        email: string;
    };

    membership?: OrganizationMember;

    project?: Project;

    sprint?: Sprint;

    task?: Task;

    file?: Express.Multer.File;
}