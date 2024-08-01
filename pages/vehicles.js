import React from "react";
import Head from "next/head";
import { useTranslations } from "next-intl";
import {
  Section,
  BreadCrumb,
  Title,
  Container,
  View,
  Image,
  Text,
  LogisticsCard,
} from "components";
import { getVehicles } from "service";

import User from "@/assets/icons/user.svg";
import Auto from "@/assets/icons/auto.svg";

import WifiIcon from "@/assets/icons/wifi.svg";
import DriverIcon from "@/assets/icons/driver.svg";
import AirIcon from "@/assets/icons/air.svg";

const FEATURES_ICON = {
  airConditioning: <AirIcon width="15px" height="15px" />,
  wifi: <WifiIcon width="15px" height="15px" />,
  driverInformation: <DriverIcon width="15px" height="15px" />,
};

const VehiclesPage = ({ pageProps }) => {
  const t = useTranslations();
  const { vehicles } = pageProps;

  console.log(vehicles, "vehicles");

  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER - Vehicles </title>
        <meta name="description" content="VICTORIA TRANSFER" />
      </Head>
      <BreadCrumb background="#1059A0 !important;">
        <Title mt="100px" fontSize={["45px", "45px", "60px"]}>
          Our Vehicles
        </Title>
        <View
          as="p"
          maxWidth="642px"
          m="0 auto"
          mt="68px"
          fontSize={["17px", "17px", "24px"]}
          color="#fff"
        >
          Let’s check our veichles and book transfers!
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
            {vehicles?.map?.((vehicle) => (
              <LogisticsCard key={vehicle?._id}>
                {vehicle?.imageUrl ? <Image src={vehicle?.imageUrl} /> : null}
                <LogisticsCard.Title>{vehicle?.name}</LogisticsCard.Title>
                <Text>{t(vehicle?.type)}</Text>
                <View
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <LogisticsCard.Desc>
                      <User />
                    {vehicle?.passengerCapacity} {t("passengers")}
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                      <Auto />
                    {t(vehicle?.transmission)}
                  </LogisticsCard.Desc>
                  {vehicle.features.map((feature, index) => (
                    <LogisticsCard.Desc key={feature}>
                      {FEATURES_ICON[feature]} {t(feature)}
                    </LogisticsCard.Desc>
                  ))}
                </View>
              </LogisticsCard>
            ))}
          </View>
        </Container>
      </Section>
    </>
  );
};

export default VehiclesPage;

export async function getStaticProps() {
  const vehicles = await getVehicles();

  return {
    props: {
      vehicles,
    },
  };
}
