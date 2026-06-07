import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validationMiddleware =
  (dtoClass: any) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.body);

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        message: 'Validation Failed',
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });

      return;
    }

    req.body = dto;

    next();
  };