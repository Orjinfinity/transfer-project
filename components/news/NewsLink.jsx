import styled from "styled-components";
import { Link } from "components";
import ArrowRightIcon from "../../assets/icons/arrow-right.svg";

const StyledNewsLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const NewsLink = ({ href, ...otherProps }) => {
  return (
    <StyledNewsLink href={href} {...otherProps}>
      Detay{" "}
      <ArrowRightIcon
        style={{ marginTop: "4px", marginLeft: "3px" }}
        color="black"
      />
    </StyledNewsLink>
  );
};

export default NewsLink;
