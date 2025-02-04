import type { Context } from "hono";
import type { ResponseHeader } from "hono/utils/headers";
import type { Bindings } from "~/types";
import type { APISuccessResponse } from "./types";

export function apiSuccessHandler<T>(
  data: T,
  c: Context<{ Bindings: Bindings }>,
  headers?: Record<ResponseHeader, string>,
) {
  return c.json(
    { type: "success", data } satisfies APISuccessResponse<T>,
    200,
    headers,
  );
}
