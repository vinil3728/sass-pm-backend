import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validationMiddleware } from '../../../shared/middleware/validation.middleware';

import { RegisterDto } from '../dto/request/register.dto';
import { LoginDto } from '../dto/request/login.dto';
import { RefreshTokenDto } from '../dto/request/refresh-token.dto';
import { LogoutDto } from '../dto/request/logout.dto';

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

router.post(
  '/refresh-token',
  validationMiddleware(
    RefreshTokenDto
  ),
  controller.refreshToken
);

router.post(
  '/logout',
  validationMiddleware(
    LogoutDto
  ),
  controller.logout
);


export default router;