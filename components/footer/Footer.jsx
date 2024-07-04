import { useRef, useState } from "react";

import { useForm, Controller } from "react-hook-form";

import {
  Container,
  View,
  Link,
  Checkbox,
  Grid,
  Title,
  Section,
  Input,
  Button,
  Image,
  SocialBox,
  Text,
} from "@/components";

import Facebook from "../../assets/icons/facebook.svg";
import Twitter from "../../assets/icons/twitter.svg";
import Youtube from "../../assets/icons/youtube.svg";
import Instagram from "../../assets/icons/instagram.svg";
import Location from "../../assets/icons/location.svg";
import Phone from "../../assets/icons/call.svg";
import Mail from "../../assets/icons/sms.svg";

import { FooterWrapper } from "./FooterStyled";

const Footer = () => {
  return (
    <FooterWrapper
      as="footer"
      id="footer"
      borderTop="2px solid rgba(0, 0, 0, .1)"
    >
      <Section py="80px" backgroundColor="#051C34">
        <Container>
          <Grid gridTemplateColumns={["1fr", "1fr", "450px 1fr"]}>
            <View maxWidth={["100%", "100%", "300px"]}>
              <Link href="/" mr="40px">
                {/* <Logo /> */}
                <Image src="/logo.png" width="170px" alt="logo" />
              </Link>
              
              <View
                  mt="20px"
                  display="grid"
                  gridTemplateColumns="1fr"
                  gridRowGap="10px"
             
                >
                    <Link      color="#D6D6D6 !important;"  href="#" display="flex" alignItems="center">
                    <Text as="span" mr="7px">
                      <Location />
                    </Text>
                    ViktoryaTranfer, Central, Antalya 
                  </Link>

                  <Link  color="#D6D6D6 !important;"  href="tel:05336809963" display="flex" alignItems="center">
                    <Text as="span" mr="7px">
                      <Phone />
                    </Text>
                    +90 533 680 99 63
                  </Link>
                  <Link
                       color="#D6D6D6 !important;" 
                    href="mailto:info@victoriatransfers.com"
                    display="flex"
                    alignItems="center"
                  >
                    <Text as="span" mr="7px">
                      <Mail />
                    </Text>
                    info@victoriatransfers.com
                  </Link>
                 
                </View>

             
            </View>
            <View
              display="flex"
              flexDirection={["column", "column", "row"]}
              my={["30px", "30px", "0px"]}
            >
              <View width={["100%", "100%", "50%"]}>
                <Title as="h4" size="16px" mb="20px">
                  Pages
                </Title>
                <View
                  display="grid"
                  gridTemplateColumns="1fr"
                  gridRowGap="10px"
                  color="#D6D6D6"
                >
                  <Link color="#D6D6D6 !important;"  href="/">Home</Link>
                  <Link color="#D6D6D6 !important;"  href="/">FAQ</Link>
                  <Link color="#D6D6D6 !important;"  href="/">Gallery</Link>
                  <Link color="#D6D6D6 !important;"  href="/">Destinations</Link>
                  <Link color="#D6D6D6 !important;"  href="/">Contact</Link>
 
                </View>
              </View>

              <View width={["100%", "100%", "50%"]}>
                <Title as="h4" size="16px" mb="20px">
                Resources
                </Title>
                <View
                  display="grid"
                  gridTemplateColumns="1fr"
                  gridRowGap="10px"
                >
                  <Link  color="#D6D6D6 !important;" href="/">Privacy Policy</Link>
                  <Link  color="#D6D6D6 !important;"  href="/">Terms of use</Link>
                  <Link  color="#D6D6D6 !important;"  href="/">KVKK Text</Link>
                  <Link  color="#D6D6D6 !important;"  href="/">Our Licences</Link>
                 
 
                </View>
              </View>

          
              <View width={["100%", "100%", "50%"]}>
                  <Image src="/payment.png" width="141px" />
              </View>
              <View width={["100%", "100%", "50%"]}>
                <Title as="h4" size="16px" mb="20px" mt={["50px", "50px", "0px"]}>
                  Follow Us
                </Title>
                <SocialBox>
                <SocialBox.Item href="/">
                  <Facebook />
                </SocialBox.Item>
                <SocialBox.Item href="/"> 
                  <Youtube />
                </SocialBox.Item>
                <SocialBox.Item href="/">
                  <Instagram />
                </SocialBox.Item>
              
              </SocialBox>
              </View>
            </View>
          </Grid>
        </Container>
      </Section>
      <Container>
        <View
          my="30px"
          borderTop="1px solid #575757"
          display="flex"
          
          flexDirection={["column", "column", "row"]}
          justifyContent={["center", "center", "space-between"]}
    
        >
          <View  mt="32px" fontSize="12px" color="#D6D6D6">Copyright 2024 ・Viktorya Travel  Turizm Limited. All Rights Reserved</View>

          {/* <View fontWeight="bold">
            Created by
            <Link
              color="red !important"
              href="https://www.orjinfinity.com/"
            >
              {" "}
              Orjinfinity
            </Link>
          </View> */}
        </View>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
