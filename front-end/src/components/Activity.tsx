import { ActivityFragment } from "@/graphql/generated/types";
import AddFavoriteActivity from "@/graphql/mutations/activity/addFavoriteActivity";
import RemoveFavoriteActivity from "@/graphql/mutations/activity/removeFavoriteActivity";
import GetFavoriteActivities from "@/graphql/queries/activity/getFavoriteActivities";
import { useAuth } from "@/hooks";
import { useGlobalStyles } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ActivityProps {
  activity: ActivityFragment;
}

export function Activity({ activity }: ActivityProps) {
  const { classes } = useGlobalStyles();
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

  const [addFavorite, { loading: adding }] = useMutation(AddFavoriteActivity, {
    onCompleted: () => refetchFavorites(),
    onError: (err) => console.error("Error adding favorite:", err),
  });

  const [removeFavorite, { loading: removing }] = useMutation(
    RemoveFavoriteActivity,
    {
      onCompleted: () => refetchFavorites(),
      onError: (err) => console.error("Error removing favorite:", err),
    }
  );

  const handleToggleFavorite = () => {
    if (!user) return;

    if (isFavorite) {
      removeFavorite({
        variables: { activityId: String(activity.id) },
      });
    } else {
      addFavorite({
        variables: { activityId: String(activity.id) },
      });
    }
  };

  return (
    <Grid.Col span={4}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://dummyimage.com/480x4:3"
            height={160}
            alt="random image of city"
          />
        </Card.Section>

        <Flex justify="space-between" align="center" mt="md" mb="xs">
          <Text weight={500} className={classes.ellipsis} style={{ flex: 1 }}>
            {activity.name}
          </Text>
          {user && (
            <ActionIcon
              color={isFavorite ? "red" : "gray"}
              onClick={handleToggleFavorite}
              loading={adding || removing}
            >
              {isFavorite ? (
                <IconHeartFilled size={20} />
              ) : (
                <IconHeart size={20} />
              )}
            </ActionIcon>
          )}
        </Flex>

        <Group mt="md" mb="xs">
          <Badge color="pink" variant="light">
            {activity.city}
          </Badge>
          <Badge color="yellow" variant="light">{`${activity.price}€/j`}</Badge>
        </Group>

        <Text size="sm" color="dimmed" className={classes.ellipsis}>
          {activity.description}
        </Text>

        <Link href={`/activities/${activity.id}`} className={classes.link}>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Voir plus
          </Button>
        </Link>

        {user?.role === "admin" && (
          <Text size="sm" color="dimmed" className={classes.ellipsis}>
            {new Date(activity.createdAt).toLocaleString()}
          </Text>
        )}
      </Card>
    </Grid.Col>
  );
}
