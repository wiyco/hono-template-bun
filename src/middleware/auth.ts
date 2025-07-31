import type { Context, Next } from "hono";
import { parseEnv } from "~/constants";
import { APIError } from "~/handler";
import type { Bindings } from "~/types";
import { generateHMAC } from "~/utils/crypto";

const DEFEAULT_TIMESTAMP_TOLERANCE = 5 * 60 * 1000; // 5 minutes (milliseconds)

export async function authMiddleware(
  c: Context<{
    Bindings: Bindings;
  }>,
  next: Next,
  options?: {
    timestampTolerance?: number;
  },
) {
  const { timestampTolerance = DEFEAULT_TIMESTAMP_TOLERANCE } = options || {};

  /**
   * Skip authentication for non-production or non-staging environments
   */
  const { node, api } = parseEnv(c.env);
  if (node.env !== "production" && node.env !== "staging") return await next();

  const apiEndpointKey = api.endpointSecret;

  const timestamp = c.req.header("X-Request-Timestamp");
  const signature = c.req.header("X-Signature");
  if (!timestamp || !signature) {
    throw new APIError("Missing authentication headers", 401, "UNAUTHORIZED");
  }

  // Validate timestamp
  const now = Date.now();
  if (now - Number(timestamp) > timestampTolerance) {
    throw new APIError("Timestamp expired", 401, "TIMESTAMP_EXPIRED");
  }

  // Validate signature
  const payload = timestamp + c.req.path;
  const expectedSignature = await generateHMAC(payload, apiEndpointKey);

  if (signature !== expectedSignature) {
    throw new APIError("Invalid signature", 401, "INVALID_SIGNATURE");
  }

  await next();
}
