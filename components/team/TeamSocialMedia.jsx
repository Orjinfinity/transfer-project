import styled from "styled-components";
import { View, Link } from "components";

const TeamSocialMedia = styled(View)`
  margin-top: 23px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  ${Link} {
    display: block;
    width: 52px;
    height: 48px;
    line-height: 48px;
    font-size: 17px;
    color: rgba(26, 25, 29, 0.6);
    border-left: 1px solid #e9e9e9;
  }
`;

export default TeamSocialMedia;
