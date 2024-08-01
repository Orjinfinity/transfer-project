import { useState } from "react";
import Head from "next/head";
import {
  Section,
  BreadCrumb,
  Title,
  Container,
  View,
} from "components";
import { getFaqs } from "service";

const FaqPage = ({ pageProps }) => {
  const { faqs } = pageProps;

  console.log(faqs);
  const [activeTab, setActiveTab] = useState("During the Transfer");
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Making a booking":
        return (
          <View
            width={["300px", "300px", "700px"]}
            display="flex"
            m="0 auto"
            alignItems="center"
            justifyContent="center"
          >
            <View
              fontSize="22px"
              width="100%"
              py="48px"
              borderBottom="1px solid #D9DBE9"
            >
              <View
                width="100%"
                display="flex"
                fontWeight="bold"
                color={activeIndex === 0 ? "#FD7702" : "#000"}
                justifyContent="space-between"
                onClick={() => handleToggle(0)}
              >
                How do I make a booking?{" "}
                {activeIndex === 0 ? (
                  <span style={{ cursor: "pointer" }}> - </span>
                ) : (
                  <span style={{ cursor: "pointer" }}> + </span>
                )}
              </View>
              {activeIndex === 0 && (
                <View
                  maxWidth="545px"
                  fontSize="18px"
                  color="#8E8E8E"
                  as="p"
                  mt="13px"
                >
                  You can make a booking through our website or mobile app.
                </View>
              )}
            </View>
            {/* Add more FAQ items for 'Making a booking' */}
          </View>
        );
      case "Payment & Refund":
        return (
          <View
            width={["300px", "300px", "700px"]}
            display="flex"
            m="0 auto"
            alignItems="center"
            justifyContent="center"
          >
            <View
              fontSize="22px"
              width="100%"
              py="48px"
              borderBottom="1px solid #D9DBE9"
            >
              <View
                width="100%"
                display="flex"
                fontWeight="bold"
                color={activeIndex === 0 ? "#FD7702" : "#000"}
                justifyContent="space-between"
                onClick={() => handleToggle(0)}
              >
                How can I get a refund?{" "}
                {activeIndex === 0 ? (
                  <span style={{ cursor: "pointer" }}> - </span>
                ) : (
                  <span style={{ cursor: "pointer" }}> + </span>
                )}
              </View>
              {activeIndex === 0 && (
                <View
                  maxWidth="545px"
                  fontSize="18px"
                  color="#8E8E8E"
                  as="p"
                  mt="13px"
                >
                  Refunds are processed within 5-7 business days.
                </View>
              )}
            </View>
            {/* Add more FAQ items for 'Payment & Refund' */}
          </View>
        );
      case "Amending & Cancellation":
        return (
          <View
            width={["300px", "300px", "700px"]}
            display="flex"
            m="0 auto"
            alignItems="center"
            justifyContent="center"
          >
            <View
              fontSize="22px"
              width="100%"
              py="48px"
              borderBottom="1px solid #D9DBE9"
            >
              <View
                width="100%"
                display="flex"
                fontWeight="bold"
                color={activeIndex === 0 ? "#FD7702" : "#000"}
                justifyContent="space-between"
                onClick={() => handleToggle(0)}
              >
                How can I amend my booking?{" "}
                {activeIndex === 0 ? (
                  <span style={{ cursor: "pointer" }}> - </span>
                ) : (
                  <span style={{ cursor: "pointer" }}> + </span>
                )}
              </View>
              {activeIndex === 0 && (
                <View
                  maxWidth="545px"
                  fontSize="18px"
                  color="#8E8E8E"
                  as="p"
                  mt="13px"
                >
                  You can amend your booking through your account dashboard.
                </View>
              )}
            </View>
            {/* Add more FAQ items for 'Amending & Cancellation' */}
          </View>
        );
      case "During the Transfer":
        return (
          <View
            width={["300px", "300px", "700px"]}
            display="flex"
            flexDirection="column"
            m="0 auto"
            alignItems="center"
            justifyContent="center"
          >
            <View
              fontSize="22px"
              width="100%"
              py="48px"
              borderBottom="1px solid #D9DBE9"
            >
              <View
                width="100%"
                display="flex"
                fontWeight="bold"
                color={activeIndex === 0 ? "#FD7702" : "#000"}
                justifyContent="space-between"
                onClick={() => handleToggle(0)}
              >
                What Should I Do If The Plane Delays?{" "}
                {activeIndex === 0 ? (
                  <span style={{ cursor: "pointer" }}> - </span>
                ) : (
                  <span style={{ cursor: "pointer" }}> + </span>
                )}
              </View>
              {activeIndex === 0 && (
                <View
                  maxWidth="545px"
                  fontSize="18px"
                  color="#8E8E8E"
                  as="p"
                  mt="13px"
                >
                  We track the plane with the Flight Number. In any case, the
                  driver will be waiting at the exit.
                </View>
              )}
            </View>
            <View
              fontSize="22px"
              width="100%"
              py="48px"
              borderBottom="1px solid #D9DBE9"
            >
              <View
                width="100%"
                display="flex"
                fontWeight="bold"
                color={activeIndex === 1 ? "#FD7702" : "#000"}
                justifyContent="space-between"
                onClick={() => handleToggle(1)}
              >
                How can I find you at the airport?{" "}
                {activeIndex === 1 ? (
                  <span style={{ cursor: "pointer" }}> - </span>
                ) : (
                  <span style={{ cursor: "pointer" }}> + </span>
                )}
              </View>
              {activeIndex === 1 && (
                <View
                  maxWidth="545px"
                  fontSize="18px"
                  color="#8E8E8E"
                  as="p"
                  mt="13px"
                >
                  Our driver will be holding a sign with your name at the
                  arrivals hall.
                </View>
              )}
            </View>
            <View
              fontSize="22px"
              width="100%"
              py="48px"
              borderBottom="1px solid #D9DBE9"
            >
              <View
                width="100%"
                display="flex"
                fontWeight="bold"
                color={activeIndex === 2 ? "#FD7702" : "#000"}
                justifyContent="space-between"
                onClick={() => handleToggle(2)}
              >
                How can I find the car in the hotel?{" "}
                {activeIndex === 2 ? (
                  <span style={{ cursor: "pointer" }}> - </span>
                ) : (
                  <span style={{ cursor: "pointer" }}> + </span>
                )}
              </View>
              {activeIndex === 2 && (
                <View
                  maxWidth="545px"
                  fontSize="18px"
                  color="#8E8E8E"
                  as="p"
                  mt="13px"
                >
                  Our car will be waiting at the hotel entrance.
                </View>
              )}
            </View>
            <View
              fontSize="22px"
              width="100%"
              py="48px"
              borderBottom="1px solid #D9DBE9"
            >
              <View
                width="100%"
                display="flex"
                fontWeight="bold"
                color={activeIndex === 3 ? "#FD7702" : "#000"}
                justifyContent="space-between"
                onClick={() => handleToggle(3)}
              >
                What happens if I've lost my luggage?{" "}
                {activeIndex === 3 ? (
                  <span style={{ cursor: "pointer" }}> - </span>
                ) : (
                  <span style={{ cursor: "pointer" }}> + </span>
                )}
              </View>
              {activeIndex === 3 && (
                <View
                  maxWidth="545px"
                  fontSize="18px"
                  color="#8E8E8E"
                  as="p"
                  mt="13px"
                >
                  Please contact our support team immediately for assistance.
                </View>
              )}
            </View>
            <View
              fontSize="22px"
              width="100%"
              py="48px"
              borderBottom="1px solid #D9DBE9"
            >
              <View
                width="100%"
                display="flex"
                fontWeight="bold"
                color={activeIndex === 4 ? "#FD7702" : "#000"}
                justifyContent="space-between"
                onClick={() => handleToggle(4)}
              >
                Is There a Baby Seat in the Car?{" "}
                {activeIndex === 4 ? (
                  <span style={{ cursor: "pointer" }}> - </span>
                ) : (
                  <span style={{ cursor: "pointer" }}> + </span>
                )}
              </View>
              {activeIndex === 4 && (
                <View
                  maxWidth="545px"
                  fontSize="18px"
                  color="#8E8E8E"
                  as="p"
                  mt="13px"
                >
                  Yes, we provide baby seats upon request. Please mention this
                  during your booking.
                </View>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
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
                flexDirection={["column", "column", "row"]}
                mr={["20px", "20px", "0px"]}
              >
                <button
                  className={`faq-tab ${
                    activeTab === "Making a booking" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("Making a booking")}
                >
                  Making a booking
                </button>
                <button
                  className={`faq-tab ${
                    activeTab === "Payment & Refund" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("Payment & Refund")}
                >
                  Payment & Refund
                </button>
                <button
                  className={`faq-tab ${
                    activeTab === "Amending & Cancellation" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("Amending & Cancellation")}
                >
                  Amending & Cancellation
                </button>
                <button
                  className={`faq-tab ${
                    activeTab === "During the Transfer" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("During the Transfer")}
                >
                  During the Transfer
                </button>
              </View>
              {renderContent()}
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

export async function getStaticProps() {
  const faqs = await getFaqs();

  return {
    props: {
      faqs,
    },
  };
}
