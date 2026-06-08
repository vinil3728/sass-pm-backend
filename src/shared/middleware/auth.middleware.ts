import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../utils/security/jwt.util';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: 'Authorization header missing',
            });
            return;
        }

        const token =
            authHeader.replace('Bearer ', '');

        const payload =
            JwtUtil.verifyAccessToken(token);

        req.user = payload;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};