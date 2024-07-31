import { useState, useEffect, useRef, useCallback } from "react";
import { useLockedBody } from "@/hooks";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import Icon from "../icon/Icon";

import {
  Sidebar,
  View,
  Link,
  Portal,
  Image,
  Text,
  Section,
  Button,
  Container,
  Select,
} from "@/components";

import TrFlag from "@/assets/icons/tr-flag.svg";
import EnFlag from "@/assets/icons/us-flag.svg";
import DeFlag from "@/assets/icons/de-flag.svg";
import RuFlag from "@/assets/icons/ru-flag.svg";
import WpIcon from "@/assets/icons/wp.svg";

const StyledIcon = styled(Icon)`
  flex-shrink: 0;
`;

import { HamburgerMenu, HamburgerItem, HeadNav, NavLink } from "./HeaderStyled";

const Header = ({ ...props }) => {
  const t = useTranslations();
  const { locale, route } = useRouter();

  const [navbar, setNavbar] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 11) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    const listener = window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", listener);
  });

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [, setLocked] = useLockedBody();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    setLocked(isOpen);
  }, [isOpen, setLocked]);

  return (
    <>
      <Portal mounted={isOpen}>
        <View
          position="sticky"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="overlay"
          zIndex="9"
        />
      </Portal>

      <Portal mounted={isOpenSidebar}>
        <Sidebar onClose={toggleSidebar} />
      </Portal>

      <View
        background="transparent"
        className={navbar ? "navbar active" : "navbar"}
        ref={ref}
        color="#fff"
        as="header"
        px={{ default: 0, lg: 0 }}
        py={{ default: 0, lg: 0 }}
        width="100%"
        zIndex={isOpen ? "foremost" : "header"}
        {...props}
        gridArea="header"
      >
        <Section p="0px" bg="#003F7D">
          <Container>
            <View
              minHeight={["20px", "20px", "50px"]}
              display={["flex", "flex", "flex"]}
              justifyContent="space-between"
              alignItems="center"
              px={["0px", "0px", "10px"]}
            >
              <View
                display="flex"
                alignItems="center"
                flexShrink="1"
                width={["150px", "150px", "100%"]}
              >
                <Text
                  fontSize={[
                    "12px !important;",
                    "12px !important",
                    "14px !important",
                  ]}
                  color="#fff"
                >
                  Turkey Travel Agencies License No: 7528
                </Text>
              </View>
              <View
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <View className="flags">
                  <Link
                    href={route}
                    locale="en"
                    border={locale === "en" ? "1px solid #fff" : "0"}
                  >
                    <EnFlag className="flag" />
                  </Link>
                  <Link
                    href={route}
                    locale="de"
                    border={locale === "de" ? "1px solid #fff" : "0"}
                  >
                    <DeFlag className="flag" />
                  </Link>
                </View>
                <View
                  display="grid"
                  flexShrink="0"
                  gridTemplateColumns="1fr "
                  gridGap="15px"
                >
                  <Select
                    center
                    buttonProps={{
                      p: "0",
                      color: "red",
                      fontSize: "14px",
                    }}
                    placeholder="Seçiniz"
                    renderSelectToggle={({
                      toggleSelect,
                      selectedOptions,
                      placeholder,
                      isOpen,
                    }) => {
                      return (
                        <View
                          background="rgba(255, 255, 255, 0.2)"
                          borderRadius="100px"
                          p="4px"
                          display="flex"
                          alignItems="center"
                          onClick={toggleSelect}
                        >
                          <View
                            display="flex"
                            alignItems="flex-start"
                            flexDirection="column"
                            marginLeft="10px"
                          >
                            {selectedOptions?.label || (
                              <View color="white">€ EUR</View>
                            )}
                          </View>
                          <StyledIcon
                            color="white"
                            icon={isOpen ? "chevron-up" : "chevron-down"}
                          />
                        </View>
                      );
                    }}
                  >
                    {/* <Select.Option value="TRY" label="₺ TRY" /> */}
                    <Select.Option value="EUR" label="€ EUR" />
                    <Select.Option value="USD" label="$ USD" />
                  </Select>
                  {/* <Link href="tel:111111" display="flex" justifyContent="flex-end">
                <View display="flex" alignItems="center">
                  <Location />
                  <Text as="span" ml="7px" color="#bbb" fontSize="14px">
                    yakuplu sadasdsa
                  </Text>
                </View>
              </Link> */}
                </View>
              </View>
            </View>
          </Container>
        </Section>
        <Container
          p={["0px !important;", "0px !important", "0 2.5rem !important"]}
          position="relative"
        >
          <View
            top={["0px", "0px", "25px"]}
            height="80px"
            borderRadius={["0px", "0px", "100px"]}
            display="flex"
            justifyContent="space-between"
            backgroundColor="#003F7DCC"
            position={["static", "static", "absolute"]}
            width={["100%", "100%", "calc(100% - 5rem)"]}
            left="2.5rem"
            px="45px"
            pr={["0px !important;", "0px !important;", "45px !important"]}
            style={{
              backgroundBlendMode: "multiply",
              backdropFilter: "brightness(0.3)",
            }}
          >
            <View display="flex" alignItems="center">
              <Link
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={["70%", "70%", "21px"]}
                objectFit="cover"
                href="/"
              >
                {/* <Logo /> */}
                <Image
                  src="/logo.png"
                  width="189px"
                  objectFit="contain"
                  alt="logo"
                />
              </Link>
              <HeadNav className={isOpen ? "active" : ""}>
                <NavLink href="/">{t("home_page")}</NavLink>
                <NavLink href="/aboutus">{t("about_page")}</NavLink>
                {/* <NavLink href="/ekibimiz">Ekibimiz</NavLink> */}
                <NavLink href="/hizmetler">{t("services")}</NavLink>
                {/* <NavLink href="/galeri">Fotoğraflar</NavLink> */}
                {/* <NavLink href="/galeri/videolar">Videolar</NavLink> */}
                <NavLink href="/iletisim">{t("contact")}</NavLink>
              </HeadNav>{" "}
            </View>
            <View display="flex" height="100%" alignItems="center">
              <Button as="button" variant="wp">
                <WpIcon />
              </Button>
            </View>
            <View
              display={["flex", "flex", "none"]}
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="80px"
              backgroundColor="#fff"
            >
              <HamburgerMenu
                aria-label="Menü"
                isOpen={isOpen}
                onClick={toggleMenu}
              >
                <HamburgerItem />
                <HamburgerItem />
                <HamburgerItem />
              </HamburgerMenu>
            </View>
          </View>
        </Container>
      </View>
    </>
  );
};

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
