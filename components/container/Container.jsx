import styled from "styled-components";
import { position, space } from "styled-system";

const Container = styled.div`
  max-width: 1350px !important;
  margin: 0 auto;
  padding: 0 2.5rem;
  width: 100%;
  ${position}

  @media(min-width:1600px) {
    max-width: 1450px !important;
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    max-width: 1450px !important;
    padding: 0 1.5rem;
  }

  ${space}
`;

export default Container;
