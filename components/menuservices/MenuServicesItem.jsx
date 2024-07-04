import styled from "styled-components";
import { Link } from "components";

const MenuServicesItem = styled(Link)`
  font-size: 17px;
  text-transform: capitalize;
  color: #1a191d;
  display: block;
  padding: 18px 24px;
  border-bottom: 1px solid #dedede;
  background-color: #fff;
  position: relative;
 

  &:hover {
    color: #fff;
    background-color: #e0c47d;
  }
`;
export default MenuServicesItem;
