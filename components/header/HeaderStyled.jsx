import styled from "styled-components";

import Link from "../link/Link";

export const NavLink = styled(Link)`
  position: relative;
  padding: 0px 0px;
  color: #000;

  height: 100%;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.02em;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 3px 0px;

  ${({ theme }) => `  
    ${theme.mediaQueries.md} {
      color: #fff;
      flex-direction: row;
      
    }`}

  /* &:after {
    content: "";
    position: absolute;
    background-color: #fff;
    height: 4px;
    width: 100%;
    top: 0;
    left: -100%;
    z-index: 99;
    transition: all 0.2s ease-in;
  } */

  & ul {
    display: none;
    opacity: 0;
    position: static;
    top: 100%;
    left: 0;
    z-index: 99;
    width: 230px;
    background-color: #fff;
    transition: all 0.3s ease-in;

    ${({ theme }) => `
      ${theme.mediaQueries.md} {
        position: absolute;
    }`}
  }

  & li {
    border-bottom: 2px solid #f4f4f4;
    transition: all 0.3s ease-in;
  }

  & li:last-child {
    border-bottom: 1px solid #e0c47d;
  }

  & li a {
    padding: 1px 30px 0;
    position: relative;
    font-size: 15px;
    line-height: 43px;
    font-weight: 400;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 40px;
  }

  &:hover:after {
    left: 0;
  }

  &:hover ul {
    display: block;
    opacity: 1;
  }

  & li:hover {
    background-color: #e0c47d;
  }

  & li:hover > a {
    color: #fff;
  }
`;
export const HamburgerItem = styled.span`
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  background: #000;
  border-radius: 3px;
  z-index: 1;
  transform-origin: 4px 0px;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
`;

export const HamburgerMenu = styled.button`
  user-select: none;
  outline: none;
  border: none;
  box-shadow: none;
  background: transparent;

  &:focus,
  &:hover {
    outline: none;
    border: none;
    box-shadow: none;
    background: transparent;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }

  ${({ isOpen }) => `
    ${HamburgerItem} {
      &:first-child {
        transform-origin: 0% 0%;
      }

      &:last-child {
        transform-origin: 0% 100%;
      }

      ${
        isOpen
          ? `
        opacity: 1;
        transform: rotate(45deg) translate(-3px, -3px);
        background: #000;

        &:nth-last-child(2) {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
          visibility:hidden;
        }

        &:last-child {
          transform: rotate(-45deg) translate(0, -1px);
        }
      `
          : ""
      }
    }
  `}
`;

export const HeadNav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  left: 0;
  top: 80px;
  padding: 15px 40px;
  border-bottom: 5px solid #e0c47d;
  background: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: normal;
  line-height: normal;
  justify-content: flex-end;
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    align-items: center;
    position: static;
    left: inherit;
    top: inherit;
    padding: 0;
    border: none;
    background: transparent;
    transform: none;
    font-weight: 600;
    font-size: 16px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 0px;
  }

  &.active {
    transform: none;
  }
`;
