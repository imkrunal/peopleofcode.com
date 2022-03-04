import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps as NextAppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { trpc } from "./trpc";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppProps = NextAppProps & {
  err?: Error;
  Component: NextPageWithLayout;
};

type AppPropsWithChildren = AppProps & {
  children: ReactNode;
};

const AppProviders = (props: AppPropsWithChildren) => {
  const session = trpc.useQuery(["viewer.session"]).data;
  return (
    <SessionProvider session={session || undefined}>
      {props.children}
    </SessionProvider>
  );
};

export default AppProviders;
