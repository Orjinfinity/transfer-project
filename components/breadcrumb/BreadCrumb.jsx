import styled from "styled-components";
import { background, layout } from "styled-system";
import { Title } from "components";

const BreadCrumb = styled.div`
  height: auto;
  min-height: 590px;
  padding-top: 12rem;
  padding: 5rem 0;
  display: flex;
  flex-flow: column nowrap;
  background:#FD7702;
  color: #ffffff;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: height 0.3s ease;
  position: relative;
  justify-content: center;

  ${background}
  ${layout}
  ${Title} {
    color: #fff;
  }
`;

export default BreadCrumb;
