import styled from "styled-components";
import { View } from "components";

const SidebarLocation = styled(View)`
  margin: 30px 0;
  border-bottom: 1px solid #dedede;

  ${View} {
    margin-bottom: 30px;
  }
`;

export default SidebarLocation;
