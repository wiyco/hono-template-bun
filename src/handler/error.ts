import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { Bindings } from "~/types";
import type { APIErrorResponse } from "./types";

export class APIError extends Error {
  constructor(
    message: string,
    public status: ContentfulStatusCode,
    public code?: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export function apiErrorHandler(
  err: unknown,
  c: Context<{ Bindings: Bindings }>,
) {
  if (err instanceof APIError) {
    return c.json(
      {
        type: "error",
        error: {
          message: err.message,
          code: err.code,
        },
      } satisfies APIErrorResponse,
      err.status,
    );
  }
  return c.json(
    {
      type: "error",
      error: {
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR",
      },
    } satisfies APIErrorResponse,
    500,
  );
}
