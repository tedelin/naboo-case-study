import { withAuth } from "@/hocs";
import { useAuth } from "@/hooks";
import Head from "next/head";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Profile | CDTR</title>
      </Head>
      <p>Profile</p>
      <div>
        <p>{user?.email}</p>
        <p>{user?.firstName}</p>
        <p>{user?.lastName}</p>
      </div>
    </>
  );
};

export default withAuth(Profile);
