import styled from "styled-components";
import { layout, color, border } from "styled-system";

const SocialBoxItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  margin-left: 0px;
  

  ${layout}
  ${color}
  ${border}
`;

export default SocialBoxItem;
