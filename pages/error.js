import Head from "next/head";
import { Section, Title, Container, View, Image, Text, Link } from "components";
import { useTranslations } from "next-intl";

const ErrorPage = () => {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER - Error</title>
        <meta name="description" content="VICTORIA TRANSFER , " />
      </Head>

      <Section mb="55px" mt={["5px", "5px", "50px"]}>
        <Container>
          <View
            display="flex"
            flexDirection="column"
            justifyContent="center"
            m={["5px auto", "5px auto", "40px auto"]}
            alignItems="center"
          >
            <View mt="50px">
              <Image
                width={["100%", "100%", "505px"]}
                src="/unsuccessfull-img.png"
              />
            </View>
            <View
              height="100%"
              textAlign={["center", "center", "center"]}
              mt={["0px", "0px", "50px"]}
            >
              <Title
                mt="20px"
                fontSize={["30px", "30px", "32px"]}
                fontWeight="bold"
                color="#FF4B55"
              >
                {t("reservation_error")}
              </Title>

              <Text color="#000" mt="0px" fontSize="18px" lineHeight="2">
                {t("reservation_try_again")}
              </Text>

              <View mt="50px">
                <Link
                  color="#fff"
                  borderRadius="16px"
                  backgroundColor="#003F7D"
                  p="15px 100px"
                  display="inline-block"
                  href="/"
                >
                  {t("home_page")}
                </Link>
              </View>
            </View>
          </View>
        </Container>
      </Section>
    </>
  );
};

export default ErrorPage;
