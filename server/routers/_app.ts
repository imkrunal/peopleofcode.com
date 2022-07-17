import superjson from "superjson";
import { createRouter } from "../createRouter";
import { helloRouter } from "./hello";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(helloRouter);

export type AppRouter = typeof appRouter;
