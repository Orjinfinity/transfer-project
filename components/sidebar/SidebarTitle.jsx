import styled from "styled-components";

import { Title } from "components";

const SidebarTitle = styled(Title)`
  color: #1a191d;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 12px;
  position: relative;
  margin-left: 10px;

  &:after {
    content: "";
    position: absolute;
    height: 5px;
    width: 5px;
    left: -10px;
    display: block;
    top: 50%;
    transform: translateY(-50%);
    background-color: #e0c47d;
  }
`;

export default SidebarTitle;
