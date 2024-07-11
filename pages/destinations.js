import { useState } from "react";
import Head from "next/head";

import React from "react";
import Km from "../assets/icons/km.svg";
import Clock from "../assets/icons/clock.svg";

import {
  Layout,
  Section,
  BreadCrumb,
  Title,
  Container,
  View,
  Image,
  Text,
  Tag,
  Link,
  Destinations,
  Button,
} from "components";

const DestinationsPage = () => {
  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER - </title>
        <meta name="description" content="VICTORIA TRANSFER" />
      </Head>
      <Layout>
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
              gridGap={["30px", "30px", "16px"]}
              gridRowGap="40px !important"
              alignItems="center"
            >
              <Destinations>
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View textAlign="center" px="15px">
                  <View fontSize="22px" color="#333333" as="h5" pt="39px">
                    Gazipaşa Transfer
                  </View>
                  <View
                    as="span"
                    py="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="22px"
                  >
                    From{" "}
                    <View
                      as="span"
                      ml="7px"
                      color="#FD7702"
                      fontSize="42px"
                      fontWeight="bold"
                    >
                      € 40.00
                    </View>
                  </View>
                  <View pb="30px" display="flex" justifyContent="space-between">
                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Clock />{" "}
                        </View>{" "}
                        175 Min
                      </View>
                    </View>

                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Km />{" "}
                        </View>{" "}
                        180 Km{" "}
                      </View>
                    </View>
                  </View>

                  <Button>Book Now</Button>
                </View>
              </Destinations>
              <Destinations>
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View textAlign="center" px="15px">
                  <View fontSize="22px" color="#333333" as="h5" pt="39px">
                    Gazipaşa Transfer
                  </View>
                  <View
                    as="span"
                    py="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="22px"
                  >
                    From{" "}
                    <View
                      as="span"
                      ml="7px"
                      color="#FD7702"
                      fontSize="42px"
                      fontWeight="bold"
                    >
                      € 40.00
                    </View>
                  </View>
                  <View pb="30px" display="flex" justifyContent="space-between">
                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Clock />{" "}
                        </View>{" "}
                        175 Min
                      </View>
                    </View>

                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Km />{" "}
                        </View>{" "}
                        180 Km{" "}
                      </View>
                    </View>
                  </View>

                  <Button>Book Now</Button>
                </View>
              </Destinations>
              <Destinations>
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View textAlign="center" px="15px">
                  <View fontSize="22px" color="#333333" as="h5" pt="39px">
                    Gazipaşa Transfer
                  </View>
                  <View
                    as="span"
                    py="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="22px"
                  >
                    From{" "}
                    <View
                      as="span"
                      ml="7px"
                      color="#FD7702"
                      fontSize="42px"
                      fontWeight="bold"
                    >
                      € 40.00
                    </View>
                  </View>
                  <View pb="30px" display="flex" justifyContent="space-between">
                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Clock />{" "}
                        </View>{" "}
                        175 Min
                      </View>
                    </View>

                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Km />{" "}
                        </View>{" "}
                        180 Km{" "}
                      </View>
                    </View>
                  </View>

                  <Button>Book Now</Button>
                </View>
              </Destinations>
              <Destinations>
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View textAlign="center" px="15px">
                  <View fontSize="22px" color="#333333" as="h5" pt="39px">
                    Gazipaşa Transfer
                  </View>
                  <View
                    as="span"
                    py="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="22px"
                  >
                    From{" "}
                    <View
                      as="span"
                      ml="7px"
                      color="#FD7702"
                      fontSize="42px"
                      fontWeight="bold"
                    >
                      € 40.00
                    </View>
                  </View>
                  <View pb="30px" display="flex" justifyContent="space-between">
                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Clock />{" "}
                        </View>{" "}
                        175 Min
                      </View>
                    </View>

                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Km />{" "}
                        </View>{" "}
                        180 Km{" "}
                      </View>
                    </View>
                  </View>

                  <Button>Book Now</Button>
                </View>
              </Destinations>
              <Destinations>
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View textAlign="center" px="15px">
                  <View fontSize="22px" color="#333333" as="h5" pt="39px">
                    Gazipaşa Transfer
                  </View>
                  <View
                    as="span"
                    py="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="22px"
                  >
                    From{" "}
                    <View
                      as="span"
                      ml="7px"
                      color="#FD7702"
                      fontSize="42px"
                      fontWeight="bold"
                    >
                      € 40.00
                    </View>
                  </View>
                  <View pb="30px" display="flex" justifyContent="space-between">
                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Clock />{" "}
                        </View>{" "}
                        175 Min
                      </View>
                    </View>

                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Km />{" "}
                        </View>{" "}
                        180 Km{" "}
                      </View>
                    </View>
                  </View>

                  <Button>Book Now</Button>
                </View>
              </Destinations>
              <Destinations>
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View textAlign="center" px="15px">
                  <View fontSize="22px" color="#333333" as="h5" pt="39px">
                    Gazipaşa Transfer
                  </View>
                  <View
                    as="span"
                    py="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="22px"
                  >
                    From{" "}
                    <View
                      as="span"
                      ml="7px"
                      color="#FD7702"
                      fontSize="42px"
                      fontWeight="bold"
                    >
                      € 40.00
                    </View>
                  </View>
                  <View pb="30px" display="flex" justifyContent="space-between">
                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Clock />{" "}
                        </View>{" "}
                        175 Min
                      </View>
                    </View>

                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Km />{" "}
                        </View>{" "}
                        180 Km{" "}
                      </View>
                    </View>
                  </View>

                  <Button>Book Now</Button>
                </View>
              </Destinations>
              <Destinations>
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View textAlign="center" px="15px">
                  <View fontSize="22px" color="#333333" as="h5" pt="39px">
                    Gazipaşa Transfer
                  </View>
                  <View
                    as="span"
                    py="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="22px"
                  >
                    From{" "}
                    <View
                      as="span"
                      ml="7px"
                      color="#FD7702"
                      fontSize="42px"
                      fontWeight="bold"
                    >
                      € 40.00
                    </View>
                  </View>
                  <View pb="30px" display="flex" justifyContent="space-between">
                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Clock />{" "}
                        </View>{" "}
                        175 Min
                      </View>
                    </View>

                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Km />{" "}
                        </View>{" "}
                        180 Km{" "}
                      </View>
                    </View>
                  </View>

                  <Button>Book Now</Button>
                </View>
              </Destinations>
              <Destinations>
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View textAlign="center" px="15px">
                  <View fontSize="22px" color="#333333" as="h5" pt="39px">
                    Gazipaşa Transfer
                  </View>
                  <View
                    as="span"
                    py="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="22px"
                  >
                    From{" "}
                    <View
                      as="span"
                      ml="7px"
                      color="#FD7702"
                      fontSize="42px"
                      fontWeight="bold"
                    >
                      € 40.00
                    </View>
                  </View>
                  <View pb="30px" display="flex" justifyContent="space-between">
                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Clock />{" "}
                        </View>{" "}
                        175 Min
                      </View>
                    </View>

                    <View>
                      <View fontSize="18px" as="span" display="flex">
                        <View mr="5px">
                          {" "}
                          <Km />{" "}
                        </View>{" "}
                        180 Km{" "}
                      </View>
                    </View>
                  </View>

                  <Button>Book Now</Button>
                </View>
              </Destinations>
            </View>

            <View my="125px" textAlign="center">
              <Tag>LOAD MORE</Tag>
            </View>
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default DestinationsPage;
