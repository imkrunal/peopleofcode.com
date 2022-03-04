import superjson from "superjson";
import { withTRPC } from "@trpc/next";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import "../styles/globals.css";
import AppProviders, { AppProps } from "@lib/app-providers";

function MyApp(props: AppProps) {
  const { Component, pageProps, err } = props;

  return (
    <AppProviders {...props}>
      <Component {...pageProps} err={err} />
    </AppProviders>
  );
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
