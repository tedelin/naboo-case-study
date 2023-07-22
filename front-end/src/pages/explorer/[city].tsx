import { ActivityListItem, EmptyData, Filters, PageTitle } from "@/components";
import { useDebounced } from "@/hooks";
import { getActivitiesByCity } from "@/services";
import { Divider, Flex, Grid } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

interface CityDetailsProps {
  activities: Awaited<ReturnType<typeof getActivitiesByCity>>;
  city: string;
}

export const getServerSideProps: GetServerSideProps<CityDetailsProps> = async ({
  params,
  query,
}) => {
  if (!params?.city || Array.isArray(params.city)) return { notFound: true };

  if (
    (query.activity && Array.isArray(query.activity)) ||
    (query.price && Array.isArray(query.price))
  )
    return { notFound: true };

  const searchParams = (() => {
    const activity = query.activity || null;
    const price = query.price || null;
    const searchParams = new URLSearchParams();

    if (!activity && !price) return undefined;
    if (activity) searchParams.set("activity", activity);
    if (price) searchParams.set("price", price);

    return searchParams.toString();
  })();

  const activities = await getActivitiesByCity(params.city, searchParams);
  return {
    props: { activities, city: params.city },
  };
};

export default function ActivityDetails({
  activities,
  city,
}: CityDetailsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchActivity, setSearchActivity] = useState<string | undefined>(
    searchParams?.get("activity") || undefined
  );
  const debouncedSearchActivity = useDebounced(searchActivity, 300);

  const [searchPrice, setSearchPrice] = useState<number | undefined>(
    searchParams?.get("price") ? Number(searchParams.get("price")) : undefined
  );
  const debouncedSearchPrice = useDebounced(searchPrice, 300);

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (debouncedSearchActivity !== undefined)
      searchParams.set("activity", debouncedSearchActivity);

    if (debouncedSearchPrice !== undefined)
      searchParams.set("price", debouncedSearchPrice.toString());

    const stringParams = searchParams.toString();
    router.push(`/explorer/${city}${stringParams ? `?${stringParams}` : ""}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, debouncedSearchActivity, debouncedSearchPrice]);

  return (
    <>
      <Head>
        <title>{city} | CDTR</title>
      </Head>
      <PageTitle
        title={`Activités pour la ville de ${city}`}
        prevPath="/explorer"
      />
      <Grid>
        <Grid.Col span={4}>
          <Filters
            {...{
              activity: searchActivity,
              price: searchPrice,
              setSearchActivity,
              setSearchPrice,
            }}
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <Flex direction="column" gap="lg">
            {activities.length > 0 ? (
              activities.map((activity, idx) => (
                <Fragment key={activity.id}>
                  <ActivityListItem activity={activity} />
                  {idx < activities.length - 1 && <Divider my="sm" />}
                </Fragment>
              ))
            ) : (
              <EmptyData />
            )}
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}
