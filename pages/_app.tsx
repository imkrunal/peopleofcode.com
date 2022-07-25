import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "@server/routers/_app";
import superjson from "superjson";
import { trpc } from "@lib/trpc";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const session = trpc.useQuery(["user.public.session"]).data;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session || undefined}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      transformer: superjson,
    };
  },
  ssr: false,
})(App);
