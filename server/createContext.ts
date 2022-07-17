import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { GetServerSidePropsContext } from "next";

type CreateContextOptions =
  | trpcNext.CreateNextContextOptions
  | GetServerSidePropsContext;

export const createContext = async ({ req }: CreateContextOptions) => {
  // for API-response caching see https://trpc.io/docs/caching
  return {};
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
