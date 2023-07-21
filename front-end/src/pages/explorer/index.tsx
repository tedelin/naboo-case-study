import { City, PageTitle } from "@/components";
import { getCities } from "@/services";
import { Flex, Grid } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import emptyDataSvg from "../../../public/images/undraw_no_data_re_kwbl.svg";

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
      <Grid>
        {cities.length > 0 ? (
          cities.map((city) => <City city={city} key={city} />)
        ) : (
          <Flex
            direction="column"
            align="center"
            justify="center"
            w="100%"
            m="xl"
          >
            <p>Aucune ville pour le moment</p>
            <Image priority src={emptyDataSvg} alt="No data" height={250} />
          </Flex>
        )}
      </Grid>
    </>
  );
}
