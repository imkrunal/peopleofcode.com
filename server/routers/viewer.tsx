import { createProtectedRouter, createRouter } from "@server/createRouter";

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

const loggedInViewerRouter = createProtectedRouter().query("me", {
  resolve({ ctx: { user } }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  },
});

export const viewerRouter = createRouter()
  .merge(publicViewerRouter)
  .merge(loggedInViewerRouter);
