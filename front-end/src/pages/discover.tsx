import { useAuth } from "@/hooks";
import { Button } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";

export default function Discover() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Discover | CDTR</title>
      </Head>
      <p>Discover</p>
      {user && (
        <Link href="/activity/create">
          <Button>Create Activity</Button>
        </Link>
      )}
    </>
  );
}
