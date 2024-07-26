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
    position: relative;

    &::after {
      content: '';
      position: absolute;
      display: block;
      right: 0;
      width: 1px;
      height: 50%;
      background-color: #00000033;
    }
  `}
`;

export default StyledView;
