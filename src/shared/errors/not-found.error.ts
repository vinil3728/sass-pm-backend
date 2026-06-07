import { AppError } from './app-error';

export class NotFoundError extends AppError {
    constructor(message = 'Resource Not Found') {
        super(404, message);
    }
}