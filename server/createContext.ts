import prisma from "@lib/prisma";
import * as trpc from "@trpc/server";
import { Maybe } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type CreateContextOptions =
  | trpcNext.CreateNextContextOptions
  | GetServerSidePropsContext;

async function getUserFromSession({ session }: { session: Maybe<Session> }) {
  if (!session?.user?.id) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      bio: true,
      timeZone: true,
      theme: true,
      role: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}

export const createContext = async ({ req }: CreateContextOptions) => {
  const session = await getSession({ req });
  const user = await getUserFromSession({ session });
  // for API-response caching see https://trpc.io/docs/caching
  return {
    session,
    user,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
