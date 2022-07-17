import { createRouter } from "@server/createRouter";

const publicUserRouter = createRouter().query("session", {
  async resolve({ ctx }) {
    return ctx.session;
  },
});

export const userRouter = createRouter().merge("public.", publicUserRouter);
