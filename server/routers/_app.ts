import superjson from "superjson";
import { createRouter } from "../createRouter";
import { authRouter } from "./auth";
import { helloRouter } from "./hello";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(helloRouter)
  .merge("auth.", authRouter)
  .merge("user.", userRouter);

export type AppRouter = typeof appRouter;
