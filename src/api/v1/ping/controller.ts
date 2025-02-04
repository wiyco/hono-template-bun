import type { Context } from "hono";
import { apiSuccessHandler } from "~/handler";
import type { Bindings } from "~/types";
import { PingService } from "./service";

export namespace PingController {
  export async function getPong(c: Context<{ Bindings: Bindings }>) {
    const message = await PingService.pong();
    return apiSuccessHandler({ message }, c);
  }
}
