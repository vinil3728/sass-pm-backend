import { ApiResponse } from './api-response';

export class ResponseBuilder {
    static success<T>(
        message: string,
        data?: T
    ): ApiResponse<T> {
        return new ApiResponse<T>(
            true,
            message,
            data
        );
    }

    static failure(
        message: string,
        errors?: unknown
    ): ApiResponse<null> {
        return new ApiResponse(
            false,
            message,
            null,
            errors
        );
    }
}