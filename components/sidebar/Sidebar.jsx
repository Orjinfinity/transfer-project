import styled from "styled-components";
import { View, Link, SocialBox, ToggleButton } from "components";

import SidebarTitle from "./SidebarTitle";
import SidebarText from "./SidebarText";
import SidebarAbout from "./SidebarAbout";
import SidebarLocation from "./SidebarLocation";

import Facebook from "assets/icons/facebook.svg";
import Youtube from "assets/icons/youtube.svg";
import Instagram from "assets/icons/instagram.svg";
import Twitter from "assets/icons/twitter.svg";

const SidebarWrapper = styled(View)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 510px;
  background-color: #fff;
  padding: 100px 50px 70px;
  z-index: 9999999;
`;

const Sidebar = ({ onClose }) => {
  return (
    <SidebarWrapper>
      <View position="absolute" top="20px" right="20px">
        <ToggleButton isOpen onClick={onClose} />
      </View>
      <SidebarAbout>
        {/* <SidebarTitle>ABOUT US</SidebarTitle>
        <SidebarText>
          Progressively maintain extensive infomediaries via extensible nich.
          Capitalize on low hanging fruit. a ballpark value added is activity to
          beta test. Override the digital divide with additional click throughs
          from fruit.
        </SidebarText> */}
      </SidebarAbout>
      <SidebarLocation>
        <View>
          <SidebarTitle>Telefon</SidebarTitle>
          <Link href="tel:02126711188">0212 671 11 88</Link>
        </View>
        <View>
          <SidebarTitle>E-Mail</SidebarTitle>
          <Link href="mailto:info@victoriatransfers.com">info@victoriatransfers.com</Link>
        </View>
        <View>
          <SidebarTitle>Adres</SidebarTitle>
          <Link href="https://www.google.com/maps?ll=41.084812,28.802351&z=17&t=m&hl=en&gl=TR&mapclient=embed&cid=770685995843225339">İKİTELLİ İOSB ESKOOP SANAYİ SİTESİ, C2 Blok NO : 78-80, 34490 İkitelli Osb/Başakşehir/İstanbul</Link>
        </View>
      </SidebarLocation>
      <View>
        <SidebarTitle>Sosyal Medyalarımız</SidebarTitle>
        <SocialBox>
          <SocialBox.Item border="1px solid #dedede">
            <Facebook />
          </SocialBox.Item>
          <SocialBox.Item border="1px solid #dedede">
            <Youtube />
          </SocialBox.Item>
          <SocialBox.Item border="1px solid #dedede">
            <Instagram />
          </SocialBox.Item>
          <SocialBox.Item border="1px solid #dedede">
            <Twitter />
          </SocialBox.Item>
        </SocialBox>
      </View>
    </SidebarWrapper>
  );
};

export default Sidebar;
