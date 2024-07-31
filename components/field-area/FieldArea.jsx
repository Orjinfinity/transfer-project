import styled from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { border, variant } from "styled-system";

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
    flat: {},
  },
});

const statusVariant = variant({
  prop: "status",
  variants: {
    error: {
      borderBottom: "1px dashed red",
    },
    default: {},
  },
});

const StyledFieldArea = styled(View, { shouldForwardProp })`
  width: 100%;

  ${fieldAreaVariant}
  ${statusVariant}
`;

const FieldArea = ({ children, error, ...otherProps }) => (
  <View width="100%" flex="1">
    <StyledFieldArea {...otherProps} status={error ? "error" : ""}>
      {children}
    </StyledFieldArea>
    {error?.message ? (
      <View position="relative" backgroundColor="#fff">
        <ErrorMessage
          as="span"
          style={{
            textWrap: "nowrap",
          }}
          left="0"
          bottom="0"
          minWidth="100%"
          position={variant === "bordered" ? "absolute" : "relative"}
          textAlign="left"
        >
          {error?.message}
        </ErrorMessage>
      </View>
    ) : null}
  </View>
);

FieldArea.defaultProps = {
  display: "flex",
  alignItems: "center",
  variant: "flat",
  fontSize: "1rem",
};

export default FieldArea;
