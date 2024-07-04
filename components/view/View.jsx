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

const View = styled("div", {
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
`;

export default View;
