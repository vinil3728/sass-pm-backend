import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import routes from './routes';
import { errorHandler } from './shared/middleware/error-handler';

import authRoutes from './modules/auth/routes/auth.routes';
import organizationRoutes from './modules/organization/routes/organization.routes';
import teamRoutes from './modules/team/routes/team.routes';
import projectRoutes from './modules/project/routes/project.routes';
import projectTeamRoutes from './modules/project/routes/project-team.routes';
import sprintRoutes from './modules/sprint/routes/sprint.routes';
import taskRoutes from './modules/task/routes/task.routes';
import notificationRoutes from './modules/notification/routes/notification.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/v1', routes);
app.use('/api/auth', authRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api', teamRoutes);
app.use('/api', projectRoutes);
app.use('/api', projectTeamRoutes);
app.use('/api', sprintRoutes);
app.use('/api', taskRoutes);
app.use('/api', notificationRoutes);

app.use(
    '/uploads',

    express.static(
        path.join(
            process.cwd(),
            'storage'
        )
    )
);

app.use(errorHandler);

export default app;