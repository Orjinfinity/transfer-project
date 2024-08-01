import styled from "styled-components";
import { flexbox } from "styled-system";

import SocialBoxItem from "./SocialBoxItem";

const SocialBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5em;
  color: #D6D6D6;
`;

SocialBox.Item = SocialBoxItem;

export default SocialBox;
