import styled from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { variant } from "styled-system";

import { View, ErrorMessage } from "@/components";

const fieldAreaVariant = variant({
  prop: "variant",
  variants: {
    contained: {
      backgroundColor: "rgb(255, 255, 255)",
      border: "2px solid rgb(241, 243, 245)",
      borderRadius: "5px",
    },
    dashed: {
      backgroundColor: "rgb(255, 255, 255)",
      border: "2px dashed rgb(241, 243, 245)",
      borderRadius: "5px",
    },
    bordered: {
      borderBottom: "2px solid #000000",
    },
    selectable: {
      backgroundColor: "rgb(255, 255, 255)",
      border: "2px solid rgb(241, 243, 245)",
      borderRadius: "5px",
      padding: "10px",
    },
  },
});

const StyledFieldArea = styled(View, { shouldForwardProp })`
  width: 100%;

  ${fieldAreaVariant}
`;

const FieldArea = ({ children, error, ...otherProps }) => (
  <View>
    <StyledFieldArea {...otherProps}>{children}</StyledFieldArea>
    {error?.message ? <ErrorMessage>{error.message}</ErrorMessage> : null}
  </View>
);

FieldArea.defaultProps = {
  display: "flex",
  alignItems: "center",
  variant: "contained",
  fontSize: "1rem",
};

export default FieldArea;
