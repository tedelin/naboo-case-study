import { City, EmptyData, PageTitle } from "@/components";
import { getCities } from "@/services";
import { Flex } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface ExplorerProps {
  cities: Awaited<ReturnType<typeof getCities>>;
}

export const getServerSideProps: GetServerSideProps<
  ExplorerProps
> = async () => {
  const cities = await getCities();
  return { props: { cities } };
};

export default function Explorer({ cities }: ExplorerProps) {
  return (
    <>
      <Head>
        <title>Explorer | CDTR</title>
      </Head>
      <PageTitle title="Trouvez une activité dans votre ville" />
      <Flex direction="column" gap="1rem">
        {cities.length > 0 ? (
          cities.map((city) => <City city={city} key={city} />)
        ) : (
          <EmptyData />
        )}
      </Flex>
    </>
  );
}
