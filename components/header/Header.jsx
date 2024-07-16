import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { useLockedBody } from "@/hooks";
import styled from "styled-components";

import Icon from "../icon/Icon";

import {
  Sidebar,
  View,
  Link,
  Portal,
  Image,
  Button,
  ToggleButton,
  Text,
  Section,
} from "@/components";
const StyledIcon = styled(Icon)`
  flex-shrink: 0;
`;

import Arrow from "../../assets/icons/arrow.svg";
import Hamburger from "../../assets/icons/hamburger.svg";
import Mail from "../../assets/icons/mail.svg";
import Phone from "../../assets/icons/phone.svg";

import { HamburgerMenu, HamburgerItem, HeadNav, NavLink } from "./HeaderStyled";
import { Container, Select } from "components";

const Header = ({ ...props }) => {
  const router = useRouter();
  const url = router.pathname;

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
        position="absolute"
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
              <View display="flex" alignItems="center">
                <Text fontSize="14px" color="#fff">
                  Turkey Travel Agencies License No: 7528
                </Text>
              </View>
              <View display="flex" justifyContent="flex-end">
                <View display="grid" gridTemplateColumns="1fr " gridGap="15px">
                  <Select
                    buttonProps={{
                      p: "0",
                      color: "red",
                      fontSize: "14px",
                    }}
                    placeholder="EUR"
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
                    <Select.Option value="€ EUR" label="€ EUR" />
                    <Select.Option value="$ USD" label="$ USD" />
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
        <Container p="0px !important">
          <View
            mt={["0px", "0px", "25px"]}
            height="80px"
            borderRadius={["0px", "0px", "100px"]}
            display="flex"
            justifyContent="space-between"
            backgroundColor="#003F7D
"
          >
            <View display="flex" alignItems="center">
              <Link
                ml={["10px", "10px", "60px"]}
                mr={["60px", "60px", "0px"]}
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
                <NavLink href="/">Anasayfa</NavLink>
                <NavLink href="/hakkimizda">Hakkımızda</NavLink>
                {/* <NavLink href="/ekibimiz">Ekibimiz</NavLink> */}
                <NavLink href="/hizmetler">Hizmetler</NavLink>
                {/* <NavLink href="/galeri">Fotoğraflar</NavLink> */}
                {/* <NavLink href="/galeri/videolar">Videolar</NavLink> */}
                <NavLink href="/iletisim">İletişim</NavLink>
              </HeadNav>{" "}
            </View>
            <View display="flex" height="100%" alignItems="center">
              <View paddingRight="20px">
                <img src="/ae.png" />
              </View>
              <View paddingRight="20px">
                <img src="/en.png" />
              </View>
              <View paddingRight="20px">
                <img src="/wp.png" />
              </View>
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
