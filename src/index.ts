import { Hono } from "hono";
import api from "~/api";
import { APIError, apiErrorHandler } from "~/handler";
import { authMiddleware } from "~/middleware";
import { cron } from "~/schedule";
import type { Bindings } from "~/types";

const app = new Hono<{ Bindings: Bindings }>();

app.notFound((c) =>
  apiErrorHandler(new APIError("Not found or Method not allowed", 404), c),
);

app.onError(apiErrorHandler);

app.use("/api/v1/ping/*", authMiddleware);

app.route("/", api);

const scheduled: ExportedHandlerScheduledHandler<Bindings> = async (
  _ctrl,
  env,
  ctx,
) => {
  ctx.waitUntil(cron(env));
};

export default {
  ...app,
  scheduled,
};
