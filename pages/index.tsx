import { Layout } from "@components/ui";
import { trpc } from "@lib/trpc";
import { ReactNode } from "react";

const Home = () => {
  const hello = trpc.useQuery(["hello"]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
};

Home.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Home;
