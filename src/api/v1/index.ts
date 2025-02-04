import { Hono } from "hono";
import type { Bindings } from "~/types";
import { pingRoutes } from "./ping";

const v1 = new Hono<{ Bindings: Bindings }>();

v1.route("/v1", pingRoutes);

export default v1;
