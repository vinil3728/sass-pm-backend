export interface PaginationResponse<T> {

    items: T[];

    page: number;

    limit: number;

    totalItems: number;

    totalPages: number;
}