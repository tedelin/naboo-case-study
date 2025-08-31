import { EmptyData, PageTitle } from "@/components";
import ReorderFavoriteActivities from "@/graphql/mutations/activity/reorderFavoriteActivities";
import GetFavoriteActivities from "@/graphql/queries/activity/getFavoriteActivities";
import { withAuth } from "@/hocs";
import { useAuth } from "@/hooks";
import { useMutation, useQuery } from "@apollo/client";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Button, Flex, Paper, Stack, Text } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FavoriteActivity {
  id: string;
  name: string;
}

const SortableItem = ({ activity }: { activity: FavoriteActivity }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    marginBottom: "4px",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    cursor: "grab",
  };

  return (
    <Paper ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Flex justify="space-between" align="center">
        <Text>{activity.name}</Text>
        <Link href={`/activities/${activity.id}`}>
          <Button variant="light" color="blue" radius="md">
            Voir
          </Button>
        </Link>
      </Flex>
    </Paper>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteActivity[]>([]);

  const { data, loading, refetch } = useQuery(GetFavoriteActivities, {
    variables: { userId: user?.id },
    skip: !user,
  });

  const [reorderFavorite] = useMutation(ReorderFavoriteActivities);

  useEffect(() => {
    if (data?.getFavorites) {
      setFavorites(data.getFavorites);
    }
  }, [data]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = favorites.findIndex((f) => f.id === active.id);
    const newIndex = favorites.findIndex((f) => f.id === over.id);

    const newFavorites = arrayMove(favorites, oldIndex, newIndex);
    setFavorites(newFavorites);

    try {
      await reorderFavorite({
        variables: {
          activityId: active.id,
          newIndex,
        },
      });
    } catch (err) {
      console.error("Error reordering favorites:", err);
    }
  };

  return (
    <>
      <Head>
        <title>Mon profil | CDTR</title>
      </Head>
      <PageTitle title="Mon profil" />
      <Flex align="center" gap="md" mb="lg">
        <Avatar color="cyan" radius="xl" size="lg">
          {user?.firstName[0]}
          {user?.lastName[0]}
        </Avatar>
        <Flex direction="column">
          <Text>{user?.email}</Text>
          <Text>{user?.firstName}</Text>
          <Text>{user?.lastName}</Text>
        </Flex>
      </Flex>

      <Text weight={500} mb="sm">
        Mes activités favorites
      </Text>

      {favorites.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={favorites.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <Stack>
              {favorites.map((activity) => (
                <SortableItem key={activity.id} activity={activity} />
              ))}
            </Stack>
          </SortableContext>
        </DndContext>
      ) : (
        <EmptyData></EmptyData>
      )}
    </>
  );
};

export default withAuth(Profile);
