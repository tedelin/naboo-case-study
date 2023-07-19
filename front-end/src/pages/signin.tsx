import { SigninForm } from "@/components";
import { withoutAuth } from "@/hocs";
import { Paper } from "@mantine/core";
import Head from "next/head";

const Signin = () => {
  return (
    <>
      <Head>
        <title>Se connecter | CDTR</title>
      </Head>
      <h2>Se connecter</h2>
      <Paper shadow="xs" p="md">
        <SigninForm />
      </Paper>
    </>
  );
};

export default withoutAuth(Signin);
