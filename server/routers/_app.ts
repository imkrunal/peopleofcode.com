import superjson from "superjson";

import { createRouter } from "../createRouter";
import { viewerRouter } from "./viewer";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("viewer.", viewerRouter);

export type AppRouter = typeof appRouter;
