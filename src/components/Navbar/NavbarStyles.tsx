import styled from 'styled-components';

import { Container } from '../GlobalStyles/ReusedStyles';

export const NavbarHeader = styled.nav`
  width: 100%;
  height: 72px;
  background-image: url('/images/backgroundheader/mobile/background-header.png');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.h4`
  color: ${(props) => props.theme.colors.white};
`;

export const AppName = styled.p`
  font-weight: 400;
  font-size: 13px;
  color: ${(props) => props.theme.colors.white};
  opacity: 0.5;
`;

export const HamburgerButton = styled.button`
  width: auto;
  height: auto;
  border: none;
  background: none;
  padding: 5px;
  z-index: 9999;
`;

export const ModalBackground = styled.div<{ display: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9998;
  visibility: ${(props) => (props.display ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.display ? 1 : 0)};
  transition: opacity 0.4s ease-out;
`;

export const ModalContainer = styled.div`
  height: 100vh;
  width: 271px;
  position: fixed;
  right: 0;
  top: 72px;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  transform: translateX(100%);
  transition: transform 0.4s ease-out;

  &.active {
    transform: translateX(0);
  }
`;

export const TagsContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.white};
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 14px;
  column-gap: 5px;
`;

export const ButtonTag = styled.button<{ isChosen?: boolean }>`
  padding: 7px 13px;
  width: auto;
  height: auto;
  border: none;
  border-radius: 7px;
  background-color: ${(props) => (props.isChosen ? props.theme.colors.blue : props.theme.colors.lightGray)};
  color: ${(props) => (props.isChosen ? props.theme.colors.white : props.theme.colors.blue)};
  font-weight: 600;
`;

type DotProps = {
  status: 'live' | 'planned' | 'in-progress' | 'suggestion';
};

export const Dot = styled.span<DotProps>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 18px;
  background-color: ${(props) => {
    switch (props.status) {
      case 'planned':
        return '#F49F85';
      case 'in-progress':
        return '#AD1FEA';
      case 'live':
        return '#62BCFA';
      default:
        return 'none';
    }
  }};
`;
