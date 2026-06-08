import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';
import { errorHandler } from './shared/middleware/error-handler';

import authRoutes from './modules/auth/routes/auth.routes';
import organizationRoutes from './modules/organization/routes/organization.routes';
import projectRoutes from './modules/project/routes/project.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/v1', routes);
app.use('/api/auth', authRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api', projectRoutes);

app.use(errorHandler);

export default app;