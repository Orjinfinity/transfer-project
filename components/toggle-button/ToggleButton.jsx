import styled from "styled-components";

import Hamburger from "assets/icons/hamburger.svg";
import Cross from "assets/icons/cross.svg";

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
`;

const ToggleButton = ({ isOpen, onClick }) => {
  return (
    <StyledButton onClick={onClick} type="button">
      {isOpen ? <Cross /> : <Hamburger />}
    </StyledButton>
  );
};

export default ToggleButton;
