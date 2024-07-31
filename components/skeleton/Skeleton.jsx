import styled from "styled-components";
import { layout, space, color } from "styled-system";

const Skeleton = styled.div`
  ${layout}
  ${space}
  ${color}
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
  
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

Skeleton.defaultProps = {
  height: "20px",
  width: "100px",
  bg: "#e0e0e0"
};

export default Skeleton;