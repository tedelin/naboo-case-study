import { SignupForm } from "@/components";
import { withoutAuth } from "@/utils";
import { Paper } from "@mantine/core";
import Head from "next/head";

const Signup = () => {
  return (
    <>
      <Head>
        <title>S&apos;inscrire | CDTR</title>
      </Head>
      <Paper shadow="xs" p="md" sx={{ marginTop: "2rem" }}>
        <SignupForm />
      </Paper>
    </>
  );
};
export default withoutAuth(Signup);
