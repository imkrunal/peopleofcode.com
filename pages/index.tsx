import { trpc } from "@lib/trpc";

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

export default Home;
