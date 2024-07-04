import styled from "styled-components";
import { space,color,position,background  } from 'styled-system'
 
const Section = styled.section`
  padding: 20px 0;

  @media (max-width: 600px) {
    padding: 20px 0;
  }

  ${space}
  ${color}
  ${position }
  ${background}
`;

 
export default Section;
