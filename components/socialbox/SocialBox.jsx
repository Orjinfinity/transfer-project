import styled from "styled-components";
import { flexbox } from "styled-system";

import SocialBoxItem from "./SocialBoxItem";

const SocialBox = styled.div`
  display: flex;
  align-items: center;
`;

SocialBox.Item = SocialBoxItem;

export default SocialBox;
