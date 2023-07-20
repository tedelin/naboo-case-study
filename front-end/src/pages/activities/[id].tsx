import { PageTitle } from "@/components";
import { getActivity } from "@/services";
import { Badge, Flex, Grid, Group, Image, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface ActivityDetailsProps {
  activity: Awaited<ReturnType<typeof getActivity>>;
}

export const getServerSideProps: GetServerSideProps<
  ActivityDetailsProps
> = async ({ params }) => {
  if (!params?.id || Array.isArray(params.id)) return { notFound: true };
  const activity = await getActivity(params.id);
  return { props: { activity } };
};

export default function ActivityDetails({ activity }: ActivityDetailsProps) {
  return (
    <>
      <Head>
        <title>{activity.name} | CDTR</title>
      </Head>
      <PageTitle title={activity.name} prevPath="/discover" />
      <Grid>
        <Grid.Col span={7}>
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            radius="md"
            alt="Norway"
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <Flex direction="column" gap="md">
            <Group mt="md" mb="xs">
              <Badge color="pink" variant="light">
                {activity.city}
              </Badge>
              <Badge color="yellow" variant="light">
                {`${activity.price}€/j`}
              </Badge>
            </Group>
            <Text size="sm">{activity.description}</Text>
            <Text size="sm" color="dimmed">
              Ajouté par {activity.owner.firstName} {activity.owner.lastName}
            </Text>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}
