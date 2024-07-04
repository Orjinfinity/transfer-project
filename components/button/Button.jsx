import styled from "styled-components";
import PropTypes from "prop-types";
import { variant, space, flexbox } from "styled-system";

const buttonVariants = ({ theme }) =>
  variant({
    variants: {
      primary: {
        color: "white",
        bg: theme.colors.primary,
      },
      secondary: {
        color: "white",
        bg: theme.colors.secondary,
      },
      outline: {
        color: "#000",
        bg: theme.colors.outline,
        border: "1px solid black",
      },
      square: {
        width: "50px",
        height: "50px",
        minWidth: "50px",
        padding: "0",
      },
    },
  });

const Button = styled.a`
  padding: 12px 15px;
  width:100%;
  font-size: 20px;
  border: none;
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #003F7D;
  border-radius: 16px;
  color: #fff;
  position: relative;
  cursor: pointer;

   
  ${flexbox}
  ${space}
  ${buttonVariants}
`;

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

export default Button;
