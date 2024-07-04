import Head from "next/head";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Layout,
  View,
  Title,
  Container,
  Section,
  Grid,
  Image,
  Text,
  Service,
  News,
  Button,
  Input,
  Checkbox,
  Slider,
  BreadCrumb,
  LogisticsCard,
  Tag,
  CustomerCard,
  Destinations,
} from "@/components";
import { Tabs, Tab, Content } from "../components/tab/Tab";
import Background from "../assets/img/bg.jpeg";
import Airplane from "../assets/icons/airplane.svg";
import MoneyRecive from "../assets/icons/money-recive.svg";
import Calendar from "../assets/icons/calendar.svg";
import House from "../assets/icons/house.svg";
import Door from "../assets/icons/door.svg";
import Air from "../assets/icons/air.svg";
import Auto from "../assets/icons/auto.svg";
import User from "../assets/icons/user.svg";
import Star from "../assets/icons/star.svg";
import Navigation from "../assets/icons/navigation.svg";
import ArrowRight from "../assets/icons/arrow-right.svg";
import Wallet from "../assets/icons/wallet.svg";
import UserTick from "../assets/icons/user-tick.svg";
import Support from "../assets/icons/24-support.svg";
import Messages from "../assets/icons/messages-2.svg";

export default function Home() {
  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER - Ana sayfa</title>
        <meta name="description" content="VICTORIA TRANSFER " />
        <meta name="keywords" content="VICTORIA TRANSFER" />
        <meta property="og:title" content="VICTORIA TRANSFER" />
        <meta property="og:description" content="VICTORIA TRANSFER" />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:title" content="VICTORIA TRANSFER" />
        <meta name="twitter:description" content="VICTORIA TRANSFER" />
        <meta name="twitter:image" content="/logo.png" />
      </Head>
      <Layout>
        <BreadCrumb backgroundImage={`url(${Background.src})`} height="calc(100vh - 80px)">
          <Title mt="100px" fontSize="60px">
            Who we are?
          </Title>
          <View
            as="p"
            maxWidth="642px"
            m="0 auto"
            mt="68px"
            fontSize="24px"
            color="#fff"
          >
            At Victoria Transfer, we pride ourselves on exceeding expectations
            with every journey
          </View>
        </BreadCrumb>
        <Section
          my="55px"
          style={{
            backgroundSize: "cover",
          }}
        >
          <Container>
            <View textAlign="center" mb="80px">
              <Tag>OUR SERVİCES</Tag>
              <View mt="50px" as="h2" fontSize="38px">
                Why book a transfer from Victoria?
              </View>
            </View>

            <Grid gridTemplateColumns="1fr 1fr 1fr 1fr">
              <View
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <View
                  width="112px"
                  height="112px"
                  borderRadius="16px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="#ECF5FF"
                >
                  <Airplane />{" "}
                </View>
                <View>
                  <View
                    pt="40px"
                    pb="20px"
                    as="h5"
                    fontSize="20px"
                    color="#000"
                  >
                    Welcoming
                  </View>
                  <View
                    m="0 auto"
                    maxWidth="180px"
                    as="p"
                    color="#6D6D6D"
                    fontSize="14px"
                  >
                    From the minute one you will enjoy Turkish Hopitality
                    completely free
                  </View>
                </View>
              </View>

              <View
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <View
                  width="112px"
                  height="112px"
                  borderRadius="16px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="#ECF5FF"
                >
                  <MoneyRecive />{" "}
                </View>
                <View>
                  <View
                    pt="40px"
                    pb="20px"
                    as="h5"
                    fontSize="20px"
                    color="#000"
                  >
                    Reasonable Prices
                  </View>
                  <View
                    maxWidth="180px"
                    m="0 auto"
                    as="p"
                    color="#6D6D6D"
                    fontSize="14px"
                  >
                    Our prices are quite competable for the market
                  </View>
                </View>
              </View>

              <View
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <View
                  width="112px"
                  height="112px"
                  borderRadius="16px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="#ECF5FF"
                >
                  <Calendar />{" "}
                </View>
                <View>
                  <View
                    pt="40px"
                    pb="20px"
                    as="h5"
                    fontSize="20px"
                    color="#000"
                  >
                    Timely Transit
                  </View>
                  <View
                    maxWidth="180px"
                    m="0 auto"
                    as="p"
                    color="#6D6D6D"
                    fontSize="14px"
                  >
                    We are punctual when it times to time
                  </View>
                </View>
              </View>

              <View
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <View
                  width="112px"
                  height="112px"
                  borderRadius="16px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="#ECF5FF"
                >
                  <House />{" "}
                </View>
                <View>
                  <View
                    pt="40px"
                    pb="20px"
                    as="h5"
                    fontSize="20px"
                    color="#000"
                  >
                    Door-to-Door Delivery
                  </View>
                  <View
                    maxWidth="180px"
                    m="0 auto"
                    as="p"
                    color="#6D6D6D"
                    fontSize="14px"
                  >
                    We will take you directly to door of your hotel
                  </View>
                </View>
              </View>
            </Grid>
          </Container>
        </Section>

        <Section
          my="55px"
          py="100px"
          style={{
            backgroundSize: "cover",
            backgroundColor: "#ECF5FF",
          }}
        >
          <Container>
            <View textAlign="center" mb="80px">
              <Tag>OUR FLEET</Tag>
              <View mt="50px" as="h2" fontSize="38px">
                Take a look at our brand new fleet
              </View>
            </View>

            <Grid
              gridTemplateColumns="250px 250px 250px"
              alignItems="center"
              justifyContent="center"
              gridGap="32px"
            >
              <LogisticsCard>
                <Image src="/car.png" />
                <LogisticsCard.Title>Minivan</LogisticsCard.Title>
                <View
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="space-between"
                >
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <User />
                    </View>
                    4 Passagers
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Auto />
                    </View>
                    Auto
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Air />
                    </View>
                    Air Conditioning
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Door />
                    </View>
                    4 Doors
                  </LogisticsCard.Desc>
                </View>
              </LogisticsCard>
              <LogisticsCard>
                <Image src="/car.png" />
                <LogisticsCard.Title>Minivan</LogisticsCard.Title>
                <View
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="space-between"
                >
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <User />
                    </View>
                    4 Passagers
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Auto />
                    </View>
                    Auto
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Air />
                    </View>
                    Air Conditioning
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Door />
                    </View>
                    4 Doors
                  </LogisticsCard.Desc>
                </View>
              </LogisticsCard>

              <LogisticsCard>
                <Image src="/car.png" />
                <LogisticsCard.Title>Minivan</LogisticsCard.Title>
                <View
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="space-between"
                >
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <User />
                    </View>
                    4 Passagers
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Auto />
                    </View>
                    Auto
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Air />
                    </View>
                    Air Conditioning
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Door />
                    </View>
                    4 Doors
                  </LogisticsCard.Desc>
                </View>
              </LogisticsCard>
            </Grid>
            <View textAlign="center" mt="64px">
              <View
                as="a"
                href="#"
                p="19px 34px"
                display="inline-block"
                borderRadius="8px"
                backgroundColor="#fff"
                color="#4E4E4E"
                fontSize="14px"
              >
                Show all vehicles{" "}
              </View>
            </View>
          </Container>
        </Section>


        <Section
          my="55px"
          style={{
            backgroundSize: "cover",
            backgroundColor: "#F7FBFF",
          }}
        >
          <Container>
            <View textAlign="center" mb="80px">
              <Tag>OUR CUSTOMERS</Tag>
              <View mt="50px" as="h2" fontSize="38px">
                What peole say about us?
              </View>
            </View>

          </Container>

          <Slider
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={true}
          className=""
          containerClass="container-with-dots"
          itemClass="customer-carousel-item"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 1,
              slidesToSlide: 1,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 1,
              slidesToSlide: 1,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
              slidesToSlide: 1,
            },
          }}
        >
          <CustomerCard py="13.5px">
            <Image src="/customer-img.png" />
            <View minWidth="400px" px="40px" py="26px">
              <View lineHeight="1" pb="24px" fontSize="64px" as="h5">
                5.0
                <View fontSize="24px" as="span">
                  stars
                </View>
              </View>
              <Star />
              <View maxWidth="317px" mt="48px" mb="80px">
                <View as="p" fontSize="18px">
                  “I feel very secure when using Victoria Travel services. Your
                  customer care team is very enthusiastic and the driver is
                  always on time.”
                </View>
              </View>

              <View>
                <View as="h6" fontSize="24px">
                  Charlie Johnson
                </View>
                <View as="span" color="#838383">
                  From New York, US
                </View>
              </View>
            </View>
          </CustomerCard>

          <CustomerCard py="13.5px">
            <Image src="/customer-img.png" />
            <View minWidth="400px" px="40px" py="26px">
              <View lineHeight="1" pb="24px" fontSize="64px" as="h5">
                5.0
                <View fontSize="24px" as="span">
                  stars
                </View>
              </View>
              <Star />
              <View maxWidth="317px" mt="48px" mb="80px">
                <View as="p" fontSize="18px">
                  “I feel very secure when using Victoria Travel services. Your
                  customer care team is very enthusiastic and the driver is
                  always on time.”
                </View>
              </View>

              <View>
                <View as="h6" fontSize="24px">
                  Charlie Johnson
                </View>
                <View as="span" color="#838383">
                  From New York, US
                </View>
              </View>
            </View>
          </CustomerCard>

          <CustomerCard py="13.5px">
            <Image src="/customer-img.png" />
            <View minWidth="400px" px="40px" py="26px">
              <View lineHeight="1" pb="24px" fontSize="64px" as="h5">
                5.0
                <View fontSize="24px" as="span">
                  stars
                </View>
              </View>
              <Star />
              <View maxWidth="317px" mt="48px" mb="80px">
                <View as="p" fontSize="18px">
                  “I feel very secure when using Victoria Travel services. Your
                  customer care team is very enthusiastic and the driver is
                  always on time.”
                </View>
              </View>

              <View>
                <View as="h6" fontSize="24px">
                  Charlie Johnson
                </View>
                <View as="span" color="#838383">
                  From New York, US
                </View>
              </View>
            </View>
          </CustomerCard>
        </Slider>
        </Section>

        <Section
          my="55px"
          style={{
            backgroundSize: "cover",
            backgroundColor: "#fff",
          }}
        >
          <Container>
            <View textAlign="center" mb="64px">
              <Tag>TOP BOOKED</Tag>
              <View mt="50px" as="h2" fontSize="38px">
                Top Destinations
              </View>
            </View>

            <Grid
              gridTemplateColumns="275px 275px 275px"
              gridGap="64px"
              justifyContent="center"
            >
              <Destinations borderRadius="32px !important">
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View px="15px">
                  <View
                    fontSize="18px"
                    pb="16px"
                    color="#5E6282"
                    as="h5"
                    pt="25px"
                  >
                    Double Tree by Hilton
                  </View>
                  <View
                    as="span"
                    display="flex"
                    alignItems="center"
                    fontSize="16px"
                    pb="37px"
                    color="#5E6282"
                  >
                    <View pr="10px">
                      <Navigation />
                    </View>
                    Central, Antalya
                  </View>
                </View>
              </Destinations>
              <Destinations borderRadius="32px !important">
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View px="15px">
                  <View
                    fontSize="18px"
                    pb="16px"
                    color="#5E6282"
                    as="h5"
                    pt="25px"
                  >
                    Double Tree by Hilton
                  </View>
                  <View
                    as="span"
                    display="flex"
                    alignItems="center"
                    fontSize="16px"
                    pb="37px"
                    color="#5E6282"
                  >
                    <View pr="10px">
                      <Navigation />
                    </View>
                    Central, Antalya
                  </View>
                </View>
              </Destinations>
              <Destinations borderRadius="32px !important">
                <View>
                  <Image src="/des-img.png" />
                </View>
                <View px="15px">
                  <View
                    fontSize="18px"
                    pb="16px"
                    color="#5E6282"
                    as="h5"
                    pt="25px"
                  >
                    Double Tree by Hilton
                  </View>
                  <View
                    as="span"
                    display="flex"
                    alignItems="center"
                    fontSize="16px"
                    pb="37px"
                    color="#5E6282"
                  >
                    <View pr="10px">
                      <Navigation />
                    </View>
                    Central, Antalya
                  </View>
                </View>
              </Destinations>
            </Grid>

            <View display="flex" justifyContent="center" mt="64px">
              <View display="flex" as="a" href="#" fontSize="14px">
                Show all destinations{" "}
                <View pl="8px">
                  <ArrowRight />
                </View>
              </View>
            </View>
          </Container>
        </Section>
 
        <Section
          my="55px"
          style={{
            backgroundSize: "cover",
            backgroundColor:"#fff",
            display:"flex"
          }}
        >
           <View>
                  <Image width="758px" src="/chouseus.png" />
              </View>
         
            <Container> 
             
              <View>
              <View >
              <Tag>WHY CHOOSE US</Tag>
              <View mt="30px" as="h2" fontSize="38px" maxWidth="576px">
              We offer the best experience with our booking deals
              </View>
              </View>

              <View display="flex" mt="35px">
                  <View mr="24px" width="64px" height="64px" p="20px" borderRadius="16px" backgroundColor="#ECF5FF"><Wallet/></View>
                        <View maxWidth="322px">
                            <View as="h5" lineHeight="1" mb="20px" fontSize="20px" color="#000">Best price guaranteed</View>
                            <View as="p" fontSize="16px" color="#6D6D6D">Find a lower price? We’ll refund you 100%
      of the difference.</View>
                        </View>
              </View>

              <View display="flex" mt="35px">
                  <View mr="24px" width="64px" height="64px" p="20px" borderRadius="16px" backgroundColor="#ECF5FF"><UserTick/></View>
                        <View maxWidth="322px">
                            <View as="h5" lineHeight="1" mb="20px" fontSize="20px" color="#000">Experience driver</View>
                            <View as="p" fontSize="16px" color="#6D6D6D">Don’t have driver? Don’t worry, we have many
experienced driver for you.</View>
                        </View>
              </View>

              <View display="flex" mt="35px">
                  <View mr="24px" width="64px" height="64px" p="20px" borderRadius="16px" backgroundColor="#ECF5FF"><Support/></View>
                        <View maxWidth="322px">
                            <View as="h5" lineHeight="1" mb="20px" fontSize="20px" color="#000">24 hour car delivery</View>
                            <View as="p" fontSize="16px" color="#6D6D6D">Book your car anytime and we will deliver it
directly to you.</View>
                        </View>
              </View>

              <View display="flex" mt="35px">
                  <View mr="24px" width="64px" height="64px" p="20px" borderRadius="16px" backgroundColor="#ECF5FF"><Messages/></View>
                        <View maxWidth="322px">
                            <View as="h5" lineHeight="1" mb="20px" fontSize="20px" color="#000">24/7 technical support</View>
                            <View as="p" fontSize="16px" color="#6D6D6D">Have a question? Contact Rentcars support
any time when you have problem.</View>
                        </View>
              </View>
              </View>
              </Container>
     
        </Section>
      </Layout>
    </>
  );
}
