import { useState } from "react";
import Head from "next/head";
import { Section, BreadCrumb, Title, Container, View } from "components";
import { getFaqs } from "service";
import { useTranslations } from "next-intl";

const FaqPage = ({ pageProps }) => {
  const { faq } = pageProps;

  const t = useTranslations();
  const [activeTab, setActiveTab] = useState();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderContent = (category, values) => {
    if (activeTab !== category) return null;

    return values.map(({ question, answer }, index) => (
      <View
        key={question}
        width="100%"
        fontSize="22px"
        py="48px"
        borderBottom="1px solid #D9DBE9"
      >
        <View
          width="100%"
          display="flex"
          fontWeight="bold"
          color={activeIndex === index ? "#FD7702" : "#000"}
          justifyContent="space-between"
          onClick={() => handleToggle(index)}
          style={{ cursor: "pointer" }}
        >
          {question}
          {activeIndex === index ? (
            <span style={{ cursor: "pointer" }}> - </span>
          ) : (
            <span style={{ cursor: "pointer" }}> + </span>
          )}
        </View>
        {activeIndex === index && (
          <View
            maxWidth="545px"
            fontSize="18px"
            color="#8E8E8E"
            as="p"
            mt="13px"
          >
            {answer}
          </View>
        )}
      </View>
    ));
  };

  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER - </title>
        <meta name="description" content="VICTORIA TRANSFER , " />
      </Head>

      <BreadCrumb>
        <Title mt="100px" fontSize={["30px", "30px", "60px"]}>
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
            gridTemplateColumns={["1fr", "1fr", "1fr"]}
            gridGap={["30px", "30px", "70px"]}
            alignItems="center"
          >
            <div className="faq-container">
              <View
                className="faq-tabs"
                display="flex"
                justifyContent="space-around"
                flexDirection={["column", "column", "row"]}
              >
                {faq?.categories?.map((category) => (
                  <button
                    className={`faq-tab ${
                      activeTab === category ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveTab(category);
                      setActiveIndex(null);
                    }}
                  >
                    {t(category)}
                  </button>
                ))}
              </View>
              <View
                maxWidth="700px"
                display="flex"
                flexDirection="column"
                m="0 auto"
                alignItems="center"
                justifyContent="center"
              >
                {faq?.categories?.map((category) =>
                  renderContent(category, faq?.faqs[category])
                )}
              </View>
              <style jsx>{`
                .faq-container {
                  width: 100%;
                  margin: auto;
                }

                .faq-tabs {
                  display: flex;
                  justify-content: space-around;
                  margin-bottom: 20px;
                }

                .faq-item {
                  border-bottom: 1px solid #ddd;
                  width: 100%;
                  padding: 42px 0px;
                  font-size: 22px;
                }

                .faq-question {
                  display: flex;
                  justify-content: space-between;
                }

                .faq-tab {
                  padding: 20px 48px;
                  border: 1px solid #ddd;
                  cursor: pointer;
                  border-radius: 14px;
                  font-size: 20px;
                  background-color: white;
                  color: black;
                  transition: background-color 0.3s, color 0.3s;
                }

                .faq-tab:hover {
                  background-color: #f0f0f0;
                }

                .faq-tab.active {
                  background-color: #1e2a78;
                  color: white;
                }

                .faq-item {
                  margin-bottom: 10px;
                }

                .faq-item {
                  border-bottom: 1px solid #ddd;
                  padding: 45px;
                  width: 100%;
                  font-size: 22px;
                }

                .faq-question {
                  font-weight: bold;
                  cursor: pointer;
                  margin: 10px 0;
                  display: flex;
                  justify-content: space-between;
                  padding: 10px;
                  background-color: #f9f9f9;
                  border: 1px solid #ddd;
                  transition: background-color 0.3s;
                }

                .faq-question:hover {
                  background-color: #f0f0f0;
                }

                .faq-answer {
                  margin: 5px 0 15px 20px;
                  font-size: 14px;
                }
                .faq-content {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  width: 700px !important;
                  margin: 0 auto;
                }
              `}</style>
            </div>
          </View>
        </Container>
      </Section>
    </>
  );
};

export default FaqPage;

export async function getServerSideProps({ locale }) {
  const faq = await getFaqs(locale);

  return {
    props: {
      faq,
    },
  };
}
