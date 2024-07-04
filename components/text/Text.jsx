import styled from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";
import {
  space,
  typography,
  color,
  variant,
  flexbox,
  layout,
} from "styled-system";

const sizeVariant = variant({
  prop: "size",
  variants: {
    xs: {
      fontSize: "0.75rem",
    },
    sm: {
      fontSize: ".8rem",
    },
    md: {
      fontSize: "1rem",
    },
    lg: {
      fontSize: "1.2rem",
    },
    xl: {
      fontSize: "1.5rem",
    },
  },
});

const Text = styled("p", { shouldForwardProp })`
  text-decoration: none !important;
  font-family: "Open Sans", sans-serif;
  color: #000;
  line-height: 24px;
  font-size: 16px;

  @media (max-width: 600px) {
    font-size: 18px;
    line-height: 27px;
  }

  ${({ theme, underLineColor, size }) => {
    if (underLineColor) {
      return `
        text-decoration: underline;
        text-decoration-color: ${theme.colors[underLineColor]};
        text-decoration-style:inherit;
      `;
    }

    if (size) {
      return sizeVariant;
    }
  }}

  ${space}
  ${typography}
  ${color}
  ${flexbox}
  ${layout}
`;

Text.defaultProps = {};

export default Text;
