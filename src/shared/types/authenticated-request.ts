import { Request } from 'express';

import { Project }
    from '../../modules/project/models/project.model';

import { OrganizationMember }
    from '../../modules/organization/models/organization-member.model';

export interface AuthenticatedRequest
    extends Request {

    user?: {
        userId: string;
        email: string;
    };

    membership?: OrganizationMember;

    project?: Project;
}