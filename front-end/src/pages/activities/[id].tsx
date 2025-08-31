import { PageTitle } from "@/components";
import { graphqlClient } from "@/graphql/apollo";
import {
  GetActivityQuery,
  GetActivityQueryVariables,
} from "@/graphql/generated/types";
import AddFavoriteActivity from "@/graphql/mutations/activity/addFavoriteActivity";
import GetActivity from "@/graphql/queries/activity/getActivity";
import GetFavoriteActivities from "@/graphql/queries/activity/getFavoriteActivities";
import { useAuth } from "@/hooks";
import { useMutation, useQuery } from "@apollo/client";
import {
  ActionIcon,
  Badge,
  Flex,
  Grid,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ActivityDetailsProps {
  activity: GetActivityQuery["getActivity"];
}

export const getServerSideProps: GetServerSideProps<
  ActivityDetailsProps
> = async ({ params, req }) => {
  if (!params?.id || Array.isArray(params.id)) return { notFound: true };
  const response = await graphqlClient.query<
    GetActivityQuery,
    GetActivityQueryVariables
  >({
    query: GetActivity,
    variables: { id: params.id },
    context: { headers: { Cookie: req.headers.cookie } },
  });
  return { props: { activity: response.data.getActivity } };
};

export default function ActivityDetails({ activity }: ActivityDetailsProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: favData, refetch: refetchFavorites } = useQuery(
    GetFavoriteActivities,
    {
      variables: { userId: user?.id },
      skip: !user,
    }
  );

  useEffect(() => {
    if (favData?.getFavorites) {
      const favIds = favData.getFavorites.map((f: { id: string }) => f.id);
      setIsFavorite(favIds.includes(activity.id));
    }
  }, [favData, activity.id]);

  const [addFavorite, { loading }] = useMutation(AddFavoriteActivity, {
    onCompleted: () => {
      refetchFavorites();
    },
    onError: (err) => console.error("Error adding favorite:", err),
  });

  const handleAddFavorite = () => {
    if (!user) return;
    addFavorite({
      variables: { userId: user.id, activityId: String(activity.id) },
    });
  };

  return (
    <>
      <Head>
        <title>{activity.name} | CDTR</title>
      </Head>
      <PageTitle title={activity.name} prevPath={router.back} />
      <Grid>
        <Grid.Col span={7}>
          <Image
            src="https://dummyimage.com/640x4:3"
            radius="md"
            alt="random image of city"
            width="100%"
            height="400"
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
              {user && (
                <ActionIcon
                  color={isFavorite ? "red" : "gray"}
                  onClick={handleAddFavorite}
                  loading={loading}
                >
                  {isFavorite ? (
                    <IconHeartFilled size={20} />
                  ) : (
                    <IconHeart size={20} />
                  )}
                </ActionIcon>
              )}
            </Group>
            <Text size="sm">{activity.description}</Text>
            <Text size="sm" color="dimmed">
              Ajouté par {activity.owner.firstName} {activity.owner.lastName}
            </Text>
            {user?.role === "admin" && (
              <Text size="sm" color="dimmed">
                {new Date(activity.createdAt).toLocaleString()}
              </Text>
            )}
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}
