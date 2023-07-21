import { ActivityListItem, Filters, PageTitle } from "@/components";
import { getActivitiesByCity } from "@/services";
import { Divider, Flex, Grid } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Fragment } from "react";

interface CityDetailsProps {
  activities: Awaited<ReturnType<typeof getActivitiesByCity>>;
  city: string;
}

export const getServerSideProps: GetServerSideProps<CityDetailsProps> = async ({
  params,
}) => {
  if (!params?.city || Array.isArray(params.city)) return { notFound: true };
  const activities = await getActivitiesByCity(params.city);
  return { props: { activities, city: params.city } };
};

export default function ActivityDetails({
  activities,
  city,
}: CityDetailsProps) {
  return (
    <>
      <Head>
        <title>{city} | CDTR</title>
      </Head>
      <PageTitle title={city} prevPath="/explorer" />
      <Grid>
        <Grid.Col span={4}>
          <Filters />
        </Grid.Col>
        <Grid.Col span={8}>
          <Flex direction="column" gap="lg">
            {activities.map((activity, idx) => (
              <Fragment key={activity.id}>
                <ActivityListItem activity={activity} />
                {idx < activities.length - 1 && <Divider my="sm" />}
              </Fragment>
            ))}
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}
