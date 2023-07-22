import { Activity, EmptyData, PageTitle } from "@/components";
import { withAuth } from "@/hocs";
import { useAuth } from "@/hooks";
import { getUserActivities } from "@/services";
import { Button, Grid, Group } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

interface MyActivitiesProps {
  activities: Awaited<ReturnType<typeof getUserActivities>>;
}

export const getServerSideProps: GetServerSideProps<
  MyActivitiesProps
> = async () => {
  const activities = await getUserActivities();
  return { props: { activities } };
};

const MyActivities = ({ activities }: MyActivitiesProps) => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Mes activités | CDTR</title>
      </Head>
      <Group position="apart">
        <PageTitle title="Mes activités" />
        {user && (
          <Link href="/activities/create">
            <Button>Ajouter une activité</Button>
          </Link>
        )}
      </Group>
      <Grid>
        {activities.length > 0 ? (
          activities.map((activity) => (
            <Activity activity={activity} key={activity.id} />
          ))
        ) : (
          <EmptyData />
        )}
      </Grid>
    </>
  );
};

export default withAuth(MyActivities);
