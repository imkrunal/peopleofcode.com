import { createRouter } from "@server/createRouter";

const publicViewerRouter = createRouter().query("hello", {
  async resolve() {
    return { message: "Hello World!" };
  },
});

export const viewerRouter = createRouter().merge(publicViewerRouter);
