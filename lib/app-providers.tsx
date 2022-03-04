import { SessionProvider } from "next-auth/react";
import type { AppProps as NextAppProps } from "next/app";
import { ReactNode } from "react";
import { trpc } from "./trpc";

export type AppProps = NextAppProps & {
  err?: Error;
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
