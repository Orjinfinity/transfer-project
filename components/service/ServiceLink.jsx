import styled from "styled-components";
import { Link } from "components";

import ArrowRightIcon from "../../assets/icons/arrow-right.svg";

const StyledServiceLink = styled(Link)`
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #e0c47d;
  color: #fff;
  overflow: hidden;
  font-size: 15px;
`;

const ServiceLink = ({ href }) => {
  return (
    <StyledServiceLink href={href}>
      <ArrowRightIcon />
    </StyledServiceLink>
  );
};

export { ServiceLink, StyledServiceLink };
