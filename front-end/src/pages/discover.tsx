import { Activity, PageTitle } from "@/components";
import { useAuth } from "@/hooks";
import { getActivities } from "@/services";
import { Button, Flex, Grid, Group } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import emptyDataSvg from "../../public/images/undraw_no_data_re_kwbl.svg";

interface DiscoverProps {
  activities: Awaited<ReturnType<typeof getActivities>>;
}

export const getServerSideProps: GetServerSideProps<
  DiscoverProps
> = async () => {
  const activities = await getActivities();
  return { props: { activities } };
};

export default function Discover({ activities }: DiscoverProps) {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Discover | CDTR</title>
      </Head>
      <Group position="apart">
        <PageTitle title="Découvrez des activités" />
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
          <Flex
            direction="column"
            align="center"
            justify="center"
            w="100%"
            m="xl"
          >
            <p>Aucune activité pour le moment</p>
            <Image priority src={emptyDataSvg} alt="No data" height={250} />
          </Flex>
        )}
      </Grid>
    </>
  );
}
