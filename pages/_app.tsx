import superjson from "superjson";
import { withTRPC } from "@trpc/next";
import { AppProps } from "next/app";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTRPC({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            !!process.env.NEXT_PUBLIC_DEBUG ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `/api/trpc`,
        }),
      ],
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
