import * as trpc from "@trpc/server";
import { Context } from "./createContext";

export function createRouter() {
  return trpc.router<Context>().middleware(async ({ path, type, next }) => {
    const result = await next();
    return result;
  });
}

export function createProtectedRouter() {
  return createRouter().middleware(({ ctx, next }) => {
    if (!ctx.user || !ctx.session) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `user` and `session` are non-nullable to downstream procedures
        session: ctx.session,
        user: ctx.user,
      },
    });
  });
}
