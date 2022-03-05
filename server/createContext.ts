import * as trpcNext from "@trpc/server/adapters/next";
import { GetServerSidePropsContext } from "next";
import * as trpc from "@trpc/server";
import { getSession } from "@lib/auth";
import { Maybe } from "@trpc/server";
import { Session } from "next-auth";
import prisma from "@lib/prisma";

type CreateContextOptions =
  | trpcNext.CreateNextContextOptions
  | GetServerSidePropsContext;

async function getUserFromSession({ session }: { session: Maybe<Session> }) {
  if (!session?.user?.id) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return null;
  }
  const { email } = user;
  if (!email) {
    return null;
  }

  return {
    ...user,
    email,
  };
}

export const createContext = async ({ req }: CreateContextOptions) => {
  const session = await getSession({ req });
  const user = await getUserFromSession({ session });

  return {
    session,
    user,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
