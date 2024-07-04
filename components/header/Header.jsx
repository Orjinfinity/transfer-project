import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useLockedBody } from "@/hooks";

import {
  Sidebar,
  View,
  Link,
  Portal,
  Image,
  Button,
  ToggleButton,
  Text,
} from "@/components";

import Arrow from "../../assets/icons/arrow.svg";
import Hamburger from "../../assets/icons/hamburger.svg";
import Mail from "../../assets/icons/mail.svg";
import Phone from "../../assets/icons/phone.svg";

import { HamburgerMenu, HamburgerItem, HeadNav, NavLink } from "./HeaderStyled";

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
    return () => window.removeEventListener("scroll", listener)
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
          position="absolute"
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
     
        bg={
          isOpen || navbar || router.pathname === ""
            ? "white"
            : "white"
        }
        zIndex={isOpen ? "foremost" : "header"}
        {...props}
      >
        <View
    
        m="0 auto"
          bg="#003F7D"
          minHeight="50px"
          display={["none", "none", "flex"]}
          justifyContent="space-between"
          alignItems="center"
          px="10px"
          mb="25px"
        >
          <View  display="flex" alignItems="center"  m="0 auto" justifyContent="space-between"   width="1150px">
          <View display="flex" alignItems="center">
            <View
              height="5px"
              width="5px"
          
              marginRight="5px"
            />
            <Text fontSize="14px" color="#fff">
            Turkey Travel Agencies License No: 7528 
            </Text>
          </View>
          <View display="flex" justifyContent="flex-end">
           <View  >
              <select
                style={{
                  appearance: "none",
                  outline: "0",
                  border: "0",
                  boxShadow: "none",
                  flex: "1",
                  padding: "17px",
                  color: "#fff",
                  backgroundColor: "transparent",
                  backgroundImage: "none",
                  cursor: "pointer",
                }}
              >
                <option value="eur">EUR</option>
                <option value="usd">USD</option>
              </select>
            </View>  
          </View>
          </View>
         
        </View>
        <View
          height="75px"
          display="flex"
          width="1150px"
          margin="0 auto"
          justifyContent="space-between"
          backgroundColor="rgb(48 89 130 / 80%)"
          p="0px 40px"
          borderRadius="40px"
        >
          <View display="flex" alignItems="center">
            <Link
              display="flex"
              justifyContent="center"
              alignItems="center"
              // height={["70%", "70%", "100%"]}
              objectFit="cover"
              href="/"
            >
              {/* <Logo /> */}
              <img src="/logo.png" style={{width:"189px"}} objectFit="contain" alt="logo" />
            </Link>
            <HeadNav className={isOpen ? "active" : ""}>
              <NavLink href="/">Home</NavLink>
              <NavLink href="/aboutus">About Us</NavLink>
              {/* <NavLink href="/ekibimiz">Ekibimiz</NavLink> */}
              <NavLink href="/faq">F.A.Q</NavLink>
              {/* <NavLink href="/galeri">Fotoğraflar</NavLink> */}
              {/* <NavLink href="/galeri/videolar">Videolar</NavLink> */}
              <NavLink href="/gallery">Photo Gallery</NavLink>
              <NavLink href="/destinations">Destinations</NavLink>
            </HeadNav>{" "}
          </View>
          <View display="flex" height="100%" alignItems="center">
            {/* <View paddingRight="20px" borderRight="1px solid white">
              <select
                style={{
                  appearance: "none",
                  outline: "0",
                  border: "0",
                  boxShadow: "none",
                  flex: "1",
                  padding: "17px",
                  color: "#fff",
                  backgroundColor: "#d0d0d0",
                  backgroundImage: "none",
                  cursor: "pointer",
                }}
              >
                <option value="en">EN</option>
                <option value="tr">TR</option>
              </select>
            </View> */}
            <View> 
             <Link
              display="flex"
              justifyContent="center"
              alignItems="center"
              // height={["70%", "70%", "100%"]}
              objectFit="cover"
              href="/"
            >
              {/* <Logo /> */}
              <img src="/en.png" style={{width:"auto"}} objectFit="contain" alt="logo" />
            </Link>
            </View>
            <View ml="20px"> 
            <Link
              display="flex"
              justifyContent="center"
              alignItems="center"
              // height={["70%", "70%", "100%"]}
              objectFit="cover"
              href="/"
            >
              {/* <Logo /> */}
              <img src="/ae.png" style={{width:"auto"}} objectFit="contain" alt="logo" />
            </Link>
            </View>
            <View
              display={["none", "none", "flex"]}
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="80px"
              marginLeft="20px"
   
            >
               <Link
              display="flex"
              justifyContent="center"
              alignItems="center"
              // height={["70%", "70%", "100%"]}
              objectFit="cover"
              href="/"
            >
              {/* <Logo /> */}
              <img src="/wp.png" style={{width:"auto"}} objectFit="contain" alt="logo" />
            </Link>
            </View>
          </View>
          
        </View>
      </View>
    </>
  );
};

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
