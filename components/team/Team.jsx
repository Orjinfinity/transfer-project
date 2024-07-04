import styled from "styled-components";
import { View, Image } from "components";

import TeamContent from "./TeamContent";
import TeamHeader from "./TeamHeader";
import TeamSocialMedia from "./TeamSocialMedia";

const Team = styled(View)`
  &:hover {
    box-shadow: 0 8px 24px 4px rgb(0 0 0 / 15%);
    transition: all 0.5s;

    ${Image} {
      transition: all 0.5s;
      transform: scale(1.05) translateX(-3px);
      backface-visibility: hidden;
    }
  }
`;
Team.Content = TeamContent;
Team.Header = TeamHeader;
Team.SocialMedia = TeamSocialMedia;

export default Team;
