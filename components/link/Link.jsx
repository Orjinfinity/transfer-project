import styled from "styled-components";
import {
  space,
  typography,
  layout,
  position,
  color,
  border,
  variant,
} from "styled-system";

import { default as NextLink } from "next/link";

const linkVariant = variant({
  prop: "variant",
  variants: {
    article: {
      fontSize: ["18px", "18px", "16px"],
      fontWeight: ["400", "400", "bold"],
      color: "primary",
      fontFamily: "Main",
    },
  },
});

const Link = styled(NextLink)`
  text-decoration: inherit;
  color: #000;

  ${space}
  ${layout}
  ${position}
  ${typography}
  ${color}
  ${border}
  ${linkVariant}
`;
Link.defaultProps = {
  fontFamily: "Main",
};
export default Link;
