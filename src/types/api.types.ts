export interface ApiError {
  message: string;
}

export interface PaginatedQuery {
  page?: number;
  limit?: number;
}
