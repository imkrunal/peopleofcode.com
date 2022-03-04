import { createRouter } from "@server/createRouter";

const publicViewerRouter = createRouter()
  .query("hello", {
    async resolve() {
      return { message: "Hello World!" };
    },
  })
  .query("session", {
    resolve({ ctx }) {
      return ctx.session;
    },
  });

export const viewerRouter = createRouter().merge(publicViewerRouter);
