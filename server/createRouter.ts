import * as trpc from "@trpc/server";
import { Context } from "./createContext";

export function createRouter() {
  return trpc.router<Context>();
}

export function createProtectedRouter() {
  return createRouter().middleware(({ ctx, next }) => {
    // if (!ctx.user || !ctx.session) {
    //   throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    // }
    return next({
      ctx: {
        ...ctx,
        // session: ctx.session,
        // user: ctx.user,
      },
    });
  });
}
