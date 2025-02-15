import type { Bindings } from "~/types";

export function parseEnv(env: Bindings) {
  return {
    node: {
      env: env.NODE_ENV || Bun.env.NODE_ENV || "production",
    },
    api: {
      endpointUrl: env.API_ENDPOINT_URL || "http://localhost:8787",
      endpointSecret: env.API_ENDPOINT_SECRET || "",
    },
    google: {
      clientEmail: env.GOOGLE_CLIENT_EMAIL || "",
      privateKey: env.GOOGLE_PRIVATE_KEY || "",
    },
  } as const;
}

export type ParsedEnv = ReturnType<typeof parseEnv>;
