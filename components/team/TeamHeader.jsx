import styled from "styled-components";
import { View, Text, Title } from "components";

const TeamHeader = styled(View)`
  background-color: #e0c47d;
  padding: 18px 20px 13px;
  margin-bottom: 24px;
  margin-top: -35px;
  z-index: 99;
  position: relative;

  ${Text} {
    color: #fff;
  }

  ${Title} {
    color: #fff;
  }
`;

export default TeamHeader;
