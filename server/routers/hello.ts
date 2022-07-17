import { createRouter } from "@server/createRouter";

const publicHelloRouter = createRouter().query("hello", {
  async resolve() {
    return {
      greeting: `Hello World!`,
    };
  },
});

export const helloRouter = createRouter().merge(publicHelloRouter);
