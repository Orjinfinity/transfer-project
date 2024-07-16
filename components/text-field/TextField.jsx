import { forwardRef } from "react";
import styled from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { space } from "styled-system";

// eslint-disable-next-line react/display-name
const GenericField = forwardRef(({ multiple, children, ...props }, ref) => {
  const TagName = multiple ? "textarea" : "input";

  return (
    <TagName
      ref={ref}
      autoComplete="off"
      {...props}
      onChange={props.onChange}
      value={props.value}
    >
      {children}
    </TagName>
  );
});

const TextField = styled(GenericField, { shouldForwardProp })`
  border: 0;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  outline: none;
  font-size: 1em;
  outline: none;
  appearance: none;
  resize: none;

  ${space}
`;

export default TextField;
