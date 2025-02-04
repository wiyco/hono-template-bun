export interface APISuccessResponse<T> {
  type: "success";
  data: T;
}

export interface APIErrorResponse {
  type: "error";
  error: {
    message: string;
    code?: string;
  };
}

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;
