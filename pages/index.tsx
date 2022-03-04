import { trpc } from "@lib/trpc";

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
