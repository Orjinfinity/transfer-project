import styled from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";
import {
  space,
  color,
  typography,
  flexbox,
  layout,
  position,
  border,
  shadow,
  background,
  grid,
} from "styled-system";

const StyledView = styled("div", {
  shouldForwardProp,
})`
  color: #000;
  max-width: 100vw;
  box-sizing: ${({ boxSizing = "border-box" }) => boxSizing};
  ${({ transform }) => transform && `transform: ${transform};`}
  ${({ transformOrigin }) =>
    transformOrigin && `transform-origin: ${transformOrigin};`}
  ${({ transition }) => transition && `transition: ${transition};`}

  ${space}
  ${color}
  ${typography}
  ${flexbox}
  ${layout}
  ${position}
  ${border}
  ${shadow}
  ${background}
  ${grid}
  ${(props) =>
    props.afterLine &&
    `
    &::after {
      content: '';
      display: block;
      margin-left:20px;
      width: 2px;
      height: 34px;
      background-color: #00000033; /* Çizgi rengi */
    }
  `}
`;

export default StyledView;
