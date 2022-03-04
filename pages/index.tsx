import { Layout } from "@components/ui";
import { trpc } from "@lib/trpc";
import { NextPage } from "next";

export default function Home() {
  const hello = trpc.useQuery(["viewer.hello"]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.message}</p>
    </div>
  );
}

Home.getLayout = (page: NextPage) => <Layout>{page}</Layout>;
