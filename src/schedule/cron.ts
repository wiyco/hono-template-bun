import type { Bindings } from "~/types";

export async function cron(env: Bindings) {
  console.log("Processing cron job...");

  try {
    console.log(env);
    console.log(`Cron job processed at ${new Date().toISOString()}`);
  } catch (error) {
    console.error("Cron job processing failed:", error);
  }
}
