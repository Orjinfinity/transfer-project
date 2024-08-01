import styled from "styled-components";

const LogisticsCardDesc = styled.div`
  font-size: 12px;
  color: #959595;
  display: flex;
  align-items: center;
  flex: "1 1 50%";

  & + & {
    margin-top: 8px;
  }

  svg {
    margin-right: 5px;
  }
`;

export default LogisticsCardDesc;
