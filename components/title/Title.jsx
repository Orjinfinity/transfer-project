import styled from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";
import {
  space,
  typography,
  color,
  position,
  variant,
  flexbox,
} from "styled-system";

const sizeVariant = variant({
  prop: "size",
  variants: {
    xs: {
      fontSize: ".9rem",
    },
    sm: {
      fontSize: "1.5rem",
    },
    md: {
      fontSize: "2rem",
    },
    lg: {
      fontSize: "2.5rem",
    },
    xl: {
      fontSize: "3rem",
    },
  },
});

const titleVariant = variant({
  prop: "variant",
  variants: {
    default: {
      fontWeight: "500",
    },
    article: {
      fontSize: ["26px", "26px", "24px"],
      fontWeight: "600",
      lineHeight: ["34px", "34px", "31.2px"],
    },
  },
});

const Title = styled("h1", { shouldForwardProp })`
  color: #000;
  ${({ theme, underLineColor, size }) => {
    if (underLineColor) {
      return `
       
      
        border-bottom:3px solid ${theme.colors[underLineColor]};
        padding-bottom:5px;
      `;
    }

    if (size) {
      return sizeVariant;
    }
  }}
  ${titleVariant} ${space} ${typography} ${color} ${position} ${flexbox};
`;

Title.defaultProps = {
  fontFamily: "Secondary",
  variant: "default",
};

export default Title;
