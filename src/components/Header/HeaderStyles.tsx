import styled from 'styled-components';
import { Container } from '../GlobalStyles/ReusedStyles';

export const HeaderBar = styled.div`
  width: 100%;
  height: 56px;
  background-color: ${(props) => props.theme.colors.darkBlue};
  margin-bottom: 20px;
  position: fixed;
  top: 72px;

  & p {
    color: #f2f4fe;
    font-size: 13px;
  }
`;

export const FilterDiv = styled(Container)`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;

export const ButtonAndModalContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const FilterButton = styled.button`
  width: auto;
  height: auto;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  position: relative;
  & h4 {
    color: #f2f4fe;
    margin-right: 7px;
    font-size: 13px;
  }
`;

export const FilterModal = styled.div`
  height: auto;
  width: 255px;
  border-radius: 10px;
  position: absolute;
  top: 40px;
  z-index: 1;
  background-color: white;
  box-shadow: rgba(72, 84, 159, 0.25) 0px 10px 20px 0px;
`;

export const HorizontalRule = styled.hr`
  width: 100%;
  margin: 0;
  border: 0.5px solid #979797;
  opacity: 0.4;
`;
