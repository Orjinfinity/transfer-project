import styled from "styled-components";

import View from "../view/View";
import Link from "../link/Link";

import { Text, Title } from "components";

export const FooterWrapper = styled(View)`
  background: #051C34;
  color: ${({ theme }) => theme.colors.footerNavLink};
  ${Text} {
    color: white;
  }

  ${Title} {
    color: white;
  }

  ${Link} {
    font-size: 16px;
    color: white;
  }

  ${Link}:hover {
    color: #e0c47d;
  }
`;

export const FooterNavHead = styled.h2`
  color: ${({ theme }) => theme.colors.footerNavHeader};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 16px;
  line-height: 32px;
  margin-bottom: 24px;
`;

export const FooterNavLink = styled(Link)`
  display: block;
  margin: 15px 0;

  color: ${({ theme }) => theme.colors.footerNavLink};
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.disable {
    opacity: 0.5;
  }
`;
