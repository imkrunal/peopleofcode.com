import * as trpcNext from "@trpc/server/adapters/next";
import { GetServerSidePropsContext } from "next";
import * as trpc from "@trpc/server";

type CreateContextOptions =
  | trpcNext.CreateNextContextOptions
  | GetServerSidePropsContext;

export const createContext = async ({ req }: CreateContextOptions) => {
  return {};
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
