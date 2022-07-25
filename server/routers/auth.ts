import { hashPassword } from "@lib/auth";
import prisma from "@lib/prisma";
import { createRouter } from "@server/createRouter";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import slugify from "slugify";
import { z } from "zod";

const publicAuthRouter = createRouter()
  .query("session", {
    async resolve({ ctx }) {
      return ctx.session;
    },
  })
  .mutation("register", {
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(3),
    }),
    async resolve({ input }) {
      const { name, email, password } = input;
      const userExists = await prisma.user.findUnique({
        where: { email },
      });
      if (userExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already registered with this email.",
        });
      }
      const username = slugify(`${name}-${nanoid(5)}`, {
        lower: true,
        trim: true,
        strict: true,
      });
      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: { username, email, name, password: hashedPassword },
      });

      return user;
    },
  });

export const authRouter = createRouter().merge("public.", publicAuthRouter);
