export interface Bindings {
  NODE_ENV: "development" | "staging" | "production" | "test";
  API_ENDPOINT_URL: string;
  API_ENDPOINT_SECRET: string;
  GOOGLE_CLIENT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
}
