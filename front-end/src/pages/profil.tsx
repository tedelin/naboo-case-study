import { PageTitle } from "@/components";
import { withAuth } from "@/hocs";
import { useAuth } from "@/hooks";
import Head from "next/head";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Mon profil | CDTR</title>
      </Head>
      <PageTitle title="Mon profil" />
      <div>
        <p>{user?.email}</p>
        <p>{user?.firstName}</p>
        <p>{user?.lastName}</p>
      </div>
    </>
  );
};

export default withAuth(Profile);
