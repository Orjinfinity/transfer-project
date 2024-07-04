import styled from "styled-components";
export const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: 3em;
  margin-bottom:50px;

  
  @media(max-width:600px)
  {
    width: 100%;
    height: 50px !important;
    overflow:initial;
  }
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 25%;
  position: relative;

  margin-right: 0.1em;
  font-size: 1em;
  border: ${props => (props.active ? "1px solid #e0c47d" : "")};
  border-bottom: ${props => (props.active ? "none" : "")};
  background-color: ${props => (props.active ? "white" : "#e0c47d")};
  color:${props => (props.active ? '#e0c47d' : '#fff')};
  height: ${props => (props.active ? "3em" : "2.6em; top:0")};
  transition: background-color 0.5s ease-in-out;

  @media(max-width:600px)
  {
    width: 100%;
    height: 50px !important;
    
  }
`;
export const Content = styled.div`
   @media(max-width:600px)
  {
    margin-top:100px;
  }
  ${props => (props.active ? "" : "display:none")}
  
`;
