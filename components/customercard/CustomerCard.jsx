import styled from "styled-components";
import { View } from "components";

const CustomerCard = styled(View)`
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  flex-direction: column;

  ${({ theme }) => `
      ${theme.mediaQueries.lg} {
        flex-direction: row;
          align-items: stretch;
    }`}
`;

export default CustomerCard;
