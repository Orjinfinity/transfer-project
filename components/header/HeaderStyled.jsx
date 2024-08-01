import styled from "styled-components";
import Link from "../link/Link";

export const NavLink = styled(Link)`
  position: relative;
  padding: 0;
  color: #fff;
  height: 100%;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.02em;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5px 0;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    padding: 3px;
  }

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

    ${({ theme }) => theme.mediaQueries.md} {
      position: absolute;
    }
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
    background-color: #fff;
    display: inline-block;
    position: absolute;
    left: 13px;
    height: 2px;
    transition: all .4s;
    &:nth-of-type(1) {
        top: 22px;
        width: 50%;
    }
    &:nth-of-type(2) {
        top: 29px;
        width: 30%;
    }
`;

export const HamburgerMenu = styled.button`
  user-select: none;
  outline: none;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50px;
  height: 50px;
  margin-left: 10px;

  &:focus,
  &:hover {
    outline: none;
    border: none;
    background: transparent;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    ${HamburgerItem} {
      &:nth-of-type(1) {
          top: 18px;
          left: 14px;
          transform: translateY(6px) rotate(-45deg);
          width: 45%;
      }
      &:nth-of-type(2) {
          top: 30px;
          left: 14px;
          transform: translateY(-6px) rotate(45deg);
          width: 45%;
      }
    }
  `}
`;

export const HeadNav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  left: -100%;
  top: 0;
  padding: 100px 40px;
  z-index: -1;
  border-bottom: 5px solid #e0c47d;
  background: #003f7d;
  font-size: 20px;
  font-weight: normal;
  line-height: normal;
  justify-content: flex-end;
  transform-origin: 0% 0%;
  transform: translateX(-100%);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

  ${({ theme }) => theme.mediaQueries.lg} {
    z-index: unset;
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
    transform: translateX(0);
    left: 0;
  }
`;
