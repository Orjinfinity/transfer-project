import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Km from "assets/icons/km.svg";
import Clock from "assets/icons/clock.svg";

import {
  Section,
  BreadCrumb,
  Title,
  Container,
  View,
  Image,
  Destinations,
  Button,
  Price,
  Text,
} from "components";
import { getDestinations } from "service";

const DestinationsPage = ({ pageProps }) => {
  const { destinations } = pageProps;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER - Destinations </title>
        <meta name="description" content="VICTORIA TRANSFER" />
      </Head>
      <BreadCrumb background="#1059A0 !important;">
        <Title mt="100px" fontSize={["45px", "45px", "60px"]}>
          Our Destinations
        </Title>
        <View
          as="p"
          maxWidth="642px"
          m="0 auto"
          mt="68px"
          fontSize={["17px", "17px", "24px"]}
          color="#fff"
        >
          Let’s check our destinations and book transfers!
        </View>
      </BreadCrumb>
      <Section
        my="55px"
        style={{
          backgroundSize: "cover",
        }}
      >
        <Container>
          <View
            display="grid"
            gridTemplateColumns={["1fr", "1fr", "1fr 1fr 1fr 1fr"]}
            gridGap="16px"
            alignItems="center"
          >
            {destinations?.map((destination) => (
              <Destinations
                key={destination?._id}
              >
                <View>
                  <Image src={destination?.imageUrl} />
                </View>
                <View textAlign="center" px="15px">
                  <View fontSize="22px" color="#333333" as="h5" pt="39px">
                    {destination?.title}
                  </View>
                  <View
                    as="span"
                    py="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="22px"
                  >
                    Min
                    <View
                      as="span"
                      ml="7px"
                      color="#FD7702"
                      fontSize="42px"
                      fontWeight="bold"
                    >
                      <Price value={destination?.minPrice} />
                    </View>
                  </View>
                  <View pb="30px" display="flex" justifyContent="space-between">
                    <View>
                      <View display="flex" alignItems="center">
                        <Clock />
                        <Text ml="5px">{destination?.minutes} Minutes</Text>
                      </View>
                    </View>

                    <View>
                      <View display="flex" alignItems="center">
                        <Km />
                        <Text ml="5px">{destination?.distance} KM</Text>
                      </View>
                    </View>
                  </View>

                  <Button
                    mb="25px"
                    onClick={() => {
                      router.push(
                        `/?from=${destination.startingPointId}&to=${destination.destinationPointId}`
                      );
                    }}
                  >
                    Book Now
                  </Button>
                </View>
              </Destinations>
            ))}
          </View>
        </Container>
      </Section>
    </>
  );
};

export default DestinationsPage;

export async function getServerSideProps() {
  const destinations = await getDestinations();

  return {
    props: {
      destinations,
    },
  };
}
