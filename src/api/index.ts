import { Hono } from "hono";
import type { Bindings } from "~/types";
import v1 from "./v1";

const api = new Hono<{
  Bindings: Bindings;
}>();

api.route("/api", v1);

export default api;
