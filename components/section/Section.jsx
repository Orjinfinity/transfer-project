import styled from "styled-components";
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

const Section = styled.section`
  padding: 20px 0;

  @media (max-width: 600px) {
    padding: 20px 0;
  }

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

export default Section;
