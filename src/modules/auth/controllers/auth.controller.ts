import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ResponseBuilder } from '../../../shared/responses/response-builder';

export class AuthController {
  private readonly authService = new AuthService();

  // -------------------------
  // REGISTER
  // -------------------------
  register = async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);

    return res.status(201).json(
      ResponseBuilder.success(
        'User registered successfully',
        result
      )
    );
  };

  // -------------------------
  // LOGIN
  // -------------------------
  login = async (req: Request, res: Response) => {
    const result = await this.authService.login({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || ''
    });

    return res.status(200).json(
      ResponseBuilder.success(
        'Login successful',
        result
      )
    );
  };

  refreshToken = async (
    req: Request,
    res: Response
  ) => {
    const result =
      await this.authService.refreshToken(
        req.body.refreshToken
      );

    return res.status(200).json(
      ResponseBuilder.success(
        'Token refreshed successfully',
        result
      )
    );
  };

  logout = async (
    req: Request,
    res: Response
  ) => {
    await this.authService.logout(
      req.body.refreshToken
    );

    return res.status(200).json(
      ResponseBuilder.success(
        'Logged out successfully'
      )
    );
  };
}