import styled from "styled-components";
import PropTypes from "prop-types";
import {
  variant,
  space,
  color,
  typography,
  flexbox,
  layout,
  position,
  border,
  shadow,
  background,
  padding,
} from "styled-system";

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
      small: {
        padding: "8px 12px",
        fontSize: "14px",
        width: "auto",
      },
      square: {
        width: "50px",
        height: "50px",
        minWidth: "50px",
        padding: "0",
      },
      wp: {
        width: "45px",
        height: "45px",
        minWidth: "45px",
        padding: "0",
        background: "#23BF58",
        borderRadius: "50%",
      },
      link: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        padding: "0",
        background: "transparent",
      },
    },
  });

const sizeVariants = ({ theme }) =>
  variant({
    sizes: {
      sm: {
        padding: "0 0",
        background: "red",
      },
    },
  });

const Button = styled.a`
  padding: 12px 15px;
  width: 100%;
  font-size: 20px;
  border: none;
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #003f7d;
  border-radius: 8px;
  color: #fff;
  position: relative;
  cursor: pointer;

  ${space}
  ${color}
  ${typography}
  ${padding}
  ${flexbox}
  ${layout}
  ${position}
  ${border}
  ${shadow}
  ${background}
  ${buttonVariants}
  ${sizeVariants}

  :disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

export default Button;
