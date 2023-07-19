import ActivityForm from "@/components/Form/ActivityForm";
import { withAuth } from "@/hocs";
import { Paper } from "@mantine/core";
import Head from "next/head";

const CreateActivity = () => {
  return (
    <>
      <Head>
        <title>Ajouter une activité | CDTR</title>
      </Head>
      <h2>Ajouter une activité</h2>
      <Paper shadow="xs" p="md">
        <ActivityForm />
      </Paper>
    </>
  );
};

export default withAuth(CreateActivity);
