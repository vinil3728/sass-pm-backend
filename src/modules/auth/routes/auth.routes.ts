import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validationMiddleware } from '../../../shared/middleware/validation.middleware';

import { RegisterDto } from '../dto/request/register.dto';
import { LoginDto } from '../dto/request/login.dto';

const router = Router();
const controller = new AuthController();

// REGISTER
router.post(
  '/register',
  validationMiddleware(RegisterDto),
  controller.register
);

// LOGIN
router.post(
  '/login',
  validationMiddleware(LoginDto),
  controller.login
);

export default router;