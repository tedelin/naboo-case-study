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
      <Paper shadow="xs" p="md" sx={{ marginTop: "2rem" }}>
        <SigninForm />
      </Paper>
    </>
  );
};

export default withoutAuth(Signin);
