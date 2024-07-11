import Head from "next/head";
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
} from "components";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER - </title>
        <meta name="description" content="VICTORIA TRANSFER , " />
      </Head>
      <Layout>
        <BreadCrumb>
          <Title
            mt={["40px", "40px", "100px"]}
            fontSize={["30px", "30px", "60px"]}
          >
            Who we are?
          </Title>
          <View
            as="p"
            maxWidth="642px"
            m="0 auto"
            mt="68px"
            fontSize={["17px", "17px", "24px"]}
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
            <View
              display="grid"
              gridTemplateColumns={["1fr", "1fr", "441px 613px"]}
              gridGap={["30px", "30px", "70px"]}
              alignItems="center"
            >
              <View mt="50px">
                <Image src="/whoarewhe.png" />
              </View>
              <View height="100%" textAlign={["center", "center", "left"]}>
                <Tag>GET TO KNOW US</Tag>
                <Title
                  mt="20px"
                  fontSize={["30px", "30px", "38px"]}
                  fontWeight="normal"
                  color="#000"
                >
                  Who are we?
                </Title>

                <Text color="#333333" mt="32px" fontSize="18px" lineHeight="2">
                  We are a team of travel professionals dedicated to serving
                  with professionalism in order to create value for both our
                  customers and the industry we operate in. From our drivers to
                  our senior management, we are passionate about designing the
                  highest quality in our ground transportation services. We use
                  the latest technology in every detail of our operations, we
                  constantly renew our vehicle fleet and keep it up-to-date,
                  depending on the needs and development of the passenger
                  transport sector at the airport.
                </Text>
                <View
                  mt="40px"
                  display="grid"
                  textAlign={["center", "center", "left"]}
                  gridGap={["50px", "50px", "0px"]}
                  gridTemplateColumns={["1fr", "1fr", "1fr 1fr 1fr 1fr"]}
                >
                  <View>
                    <View
                      as="h5"
                      fontSize="32px"
                      fontWeight="bold"
                      color="#FD7702"
                    >
                      10+
                    </View>
                    <View fontSize="16px" color="#333333">
                      Years <br /> Experience
                    </View>
                  </View>

                  <View>
                    <View
                      as="h5"
                      fontSize="32px"
                      fontWeight="bold"
                      color="#FD7702"
                    >
                      4000+
                    </View>
                    <View fontSize="16px" color="#333333">
                      Happy <br /> Customer
                    </View>
                  </View>
                  <View>
                    <View
                      as="h5"
                      fontSize="32px"
                      fontWeight="bold"
                      color="#FD7702"
                    >
                      15+
                    </View>
                    <View fontSize="16px" color="#333333">
                      VIP <br /> Cars
                    </View>
                  </View>

                  <View>
                    <View
                      as="h5"
                      fontSize="32px"
                      fontWeight="bold"
                      color="#FD7702"
                    >
                      10+
                    </View>
                    <View fontSize="16px" color="#333333">
                      Professional <br />
                      Employees
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Container>
        </Section>

        <Section
          my="55px"
          style={{
            backgroundSize: "cover",
          }}
        >
          <Container>
            <View
              display="grid"
              gridTemplateColumns={["1fr", "1fr", "576px 441px"]}
              gridGap={["30px", "30px", "106px"]}
              alignItems="center"
            >
              <View height="100%" textAlign={["center", "center", "left"]}>
                <Tag>WHY CHOOSE US</Tag>
                <Title
                  mt="20px"
                  fontSize={["18px", "18px", "38px"]}
                  fontWeight="normal"
                  color="#000"
                >
                  We offer the best experience with our booking deals
                </Title>
                <View
                  display="grid"
                  gridTemplateColumns="1fr"
                  gridGap="40px"
                  mt="56px"
                >
                  <View
                    display="flex"
                    width={["100%", "100%", "423px"]}
                    alignItems={["center", "center", "left"]}
                    flexDirection={["column", "column", "row"]}
                  >
                    <View
                      bg="#ECF5FF"
                      p="20px"
                      width="64px"
                      height="64px"
                      borderRadius="16px"
                    >
                      <Image width="24px" src="/medal-star.png" />
                    </View>
                    <View
                      ml={["0px", "0px", "20px"]}
                      display="flex"
                      textAlign={["center", "center", "left"]}
                      flexDirection="column"
                      mt={["20px", "20px", "0px"]}
                    >
                      <Title fontSize="20px" color="#000">
                        10+ Years of experience
                      </Title>
                      <Text color="#6D6D6D" lineHeight="1.3" fontSize="13px">
                        We have 10+ years of experience in exclusive transfer
                        business. You are in good hands.
                      </Text>
                    </View>
                  </View>

                  <View
                    display="flex"
                    width={["100%", "100%", "423px"]}
                    alignItems={["center", "center", "left"]}
                    flexDirection={["column", "column", "row"]}
                  >
                    <View
                      bg="#ECF5FF"
                      p="20px"
                      width="64px"
                      height="64px"
                      borderRadius="16px"
                    >
                      <Image width="24px" src="/wallet.png" />
                    </View>
                    <View
                      ml={["0px", "0px", "20px"]}
                      display="flex"
                      textAlign={["center", "center", "left"]}
                      flexDirection="column"
                      mt={["20px", "20px", "0px"]}
                    >
                      <Title fontSize="20px" color="#000">
                        Best price guaranteed
                      </Title>
                      <Text color="#6D6D6D" lineHeight="1.3" fontSize="13px">
                        Find a lower price? We’ll refund you 100% of the
                        difference.
                      </Text>
                    </View>
                  </View>

                  <View
                    display="flex"
                    width={["100%", "100%", "423px"]}
                    alignItems={["center", "center", "left"]}
                    flexDirection={["column", "column", "row"]}
                  >
                    <View
                      bg="#ECF5FF"
                      p="20px"
                      width="64px"
                      height="64px"
                      borderRadius="16px"
                    >
                      <Image width="24px" src="/user-tick.png" />
                    </View>
                    <View
                      ml={["0px", "0px", "20px"]}
                      display="flex"
                      textAlign={["center", "center", "left"]}
                      flexDirection="column"
                      mt={["20px", "20px", "0px"]}
                    >
                      <Title fontSize="20px" color="#000">
                        Experience driver
                      </Title>
                      <Text color="#6D6D6D" lineHeight="1.3" fontSize="13px">
                        Don’t have driver? Don’t worry, we have many experienced
                        driver for you.
                      </Text>
                    </View>
                  </View>

                  <View
                    display="flex"
                    width={["100%", "100%", "423px"]}
                    alignItems={["center", "center", "left"]}
                    flexDirection={["column", "column", "row"]}
                  >
                    <View
                      bg="#ECF5FF"
                      p="20px"
                      width="64px"
                      height="64px"
                      borderRadius="16px"
                    >
                      <Image width="24px" src="/24-support.png" />
                    </View>
                    <View
                      ml={["0px", "0px", "20px"]}
                      display="flex"
                      textAlign={["center", "center", "left"]}
                      flexDirection="column"
                      mt={["20px", "20px", "0px"]}
                    >
                      <Title fontSize="20px" color="#000">
                        24 hour car delivery
                      </Title>
                      <Text color="#6D6D6D" lineHeight="1.3" fontSize="13px">
                        Book your car anytime and we will deliver it directly to
                        you.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View mt="50px">
                <Image src="/whychoouseus.png" />
              </View>
            </View>
          </Container>
        </Section>

        <Section
          my="55px"
          style={{
            backgroundSize: "cover",
          }}
        >
          <Container>
            <View
              bg="#003F7D"
              display="grid"
              gridTemplateColumns={["1fr", "1fr", "200px 200px 200px 200px"]}
              gridGap={["30px", "30px", "55px"]}
              p={["20px", "20px", "83px 170px"]}
              borderRadius="20px"
              alignItems="center"
            >
              <View
                minHeight="183px"
                p="30px 16px"
                bg="#0D3762"
                borderRadius="20px"
                display="flex"
                textAlign="center"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
              >
                <Image mb="15px" src="/icon_map.png" width="50px" />
                <View maxWidth="120px">
                  {" "}
                  <Title fontSize="16px" color="#fff" as="h5">
                    Complete Packages For All Your Wishes
                  </Title>{" "}
                </View>
              </View>
              <View
                minHeight="183px"
                p="30px 16px"
                bg="#0D3762"
                borderRadius="20px"
                display="flex"
                textAlign="center"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
              >
                <Image mb="15px" src="/over.png" width="50px" />
                <View maxWidth="120px">
                  {" "}
                  <Title fontSize="16px" color="#fff" as="h5">
                    Over 10 Years Of Experience
                  </Title>
                </View>
              </View>
              <View
                minHeight="183px"
                p="30px 16px"
                bg="#0D3762"
                borderRadius="20px"
                display="flex"
                textAlign="center"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
              >
                <Image mb="15px" src="/icon_guide.png" width="50px" />
                <View maxWidth="120px">
                  {" "}
                  <Title fontSize="16px" color="#fff" as="h5">
                    Expert Employees{" "}
                  </Title>{" "}
                </View>
              </View>
              <View
                minHeight="183px"
                p="30px 16px"
                bg="#0D3762"
                borderRadius="20px"
                display="flex"
                textAlign="center"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
              >
                <Image mb="15px" src="/icon_best_price.png" width="50px" />
                <View maxWidth="120px">
                  {" "}
                  <Title fontSize="16px" color="#fff" as="h5">
                    Guaranteed fun at the best price!
                  </Title>{" "}
                </View>
              </View>
            </View>
          </Container>
        </Section>

        <Section
          my="55px"
          style={{
            backgroundSize: "cover",
          }}
        >
          <Container>
            <View textAlign="center">
              <Tag>OUR LICENCES</Tag>
              <Title
                mt="24px"
                fontSize={["25px", "25px", "38px"]}
                mb={["40px", "40px", "20px"]}
              >
                For a Reliable and Legal Service...
              </Title>
            </View>
            <View
              display="grid"
              gridTemplateColumns={["1fr", "1fr", "245px 245px 245px"]}
              gridGap={["30px", "30px", "16px"]}
              p={["20px", "20px", "83px 170px"]}
              borderRadius="20px"
              justifyContent="center"
              alignItems="center"
            >
              <View
                boxShadow="0px 12px 24px 0px rgba(16, 76, 139, 0.16);"
                bg="#fff"
                display="flex"
                flexDirection="column"
                p="20px 24px"
                alignItems="center"
                justifyContent="center"
                borderRadius="20px"
              >
                <View
                  bg="#F7BB38"
                  width="90px"
                  height="90px"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {" "}
                  <Image src="pdf.png" width="53px" height="69px" bg="#fff" />
                </View>
                <View>
                  <Title mt="32px" mb="24px" fontsize="16px" as="h5">
                    License -1{" "}
                  </Title>
                  <Link
                    bg="#003F7D"
                    color="#fff"
                    p={["3px", "5px", "3px 5px"]}
                    borderRadius="16px"
                    pb="5px"
                    href="/"
                  >
                    See Document
                  </Link>
                </View>
              </View>

              <View
                boxShadow="0px 12px 24px 0px rgba(16, 76, 139, 0.16);"
                bg="#fff"
                display="flex"
                flexDirection="column"
                p="20px 24px"
                alignItems="center"
                justifyContent="center"
                borderRadius="20px"
              >
                <View
                  bg="#F7BB38"
                  width="90px"
                  height="90px"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {" "}
                  <Image src="pdf.png" width="53px" height="69px" bg="#fff" />
                </View>
                <View>
                  <Title mt="32px" mb="24px" fontsize="16px" as="h5">
                    License -2{" "}
                  </Title>
                  <Link
                    bg="#003F7D"
                    color="#fff"
                    p={["3px", "5px", "3px 5px"]}
                    borderRadius="16px"
                    pb="5px"
                    href="/"
                  >
                    See Document
                  </Link>
                </View>
              </View>

              <View
                boxShadow="0px 12px 24px 0px rgba(16, 76, 139, 0.16);"
                bg="#fff"
                display="flex"
                flexDirection="column"
                p="20px 24px"
                alignItems="center"
                justifyContent="center"
                borderRadius="20px"
              >
                <View
                  bg="#F7BB38"
                  width="90px"
                  height="90px"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {" "}
                  <Image src="pdf.png" width="53px" height="69px" bg="#fff" />
                </View>
                <View>
                  <Title mt="32px" mb="24px" fontsize="16px" as="h5">
                    License -3{" "}
                  </Title>
                  <Link
                    bg="#003F7D"
                    color="#fff"
                    p={["3px", "5px", "3px 5px"]}
                    borderRadius="16px"
                    pb="5px"
                    href="/"
                  >
                    See Document
                  </Link>
                </View>
              </View>
            </View>
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default AboutPage;
