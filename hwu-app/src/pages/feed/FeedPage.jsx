import Head from "../../components/layout/Head";
import useRequireAuth from "../../hooks/useRequireAuth";

export default function FeedPage() {
  useRequireAuth();

  return (
    <>
      <Head title="Feed" />
      <div>FeedPage</div>
    </>
  );
}
