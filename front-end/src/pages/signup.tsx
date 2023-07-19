import { SignupForm } from "@/components";
import { withoutAuth } from "@/hocs";
import { Paper } from "@mantine/core";
import Head from "next/head";

const Signup = () => {
  return (
    <>
      <Head>
        <title>S&apos;inscrire | CDTR</title>
      </Head>
      <h2>S&apos;inscrire</h2>
      <Paper shadow="xs" p="md">
        <SignupForm />
      </Paper>
    </>
  );
};
export default withoutAuth(Signup);
