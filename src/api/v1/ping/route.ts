import { Hono } from "hono";
import type { Bindings } from "~/types";
import { PingController } from "./controller";

const router = new Hono<{
  Bindings: Bindings;
}>();

router.get("/ping", PingController.getPong);

export default router;
