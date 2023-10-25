import styled from 'styled-components';

import { Container } from '../GlobalStyles/ReusedStyles';
const HeaderBar = styled.div`
  width: 100%;
  height: 56px;
  background-color: ${(props) => props.theme.colors.darkBlue};
`;

const FilterDiv = styled.div``;
const FilterButton = styled.button`
  width: auto;
  height: auto;
  padding: 5px;
`;

const Header: React.FC = () => {
  return (
    <HeaderBar>
      <Container>
        <FilterDiv>
          <p>Sort by :</p>
          <FilterButton></FilterButton>
        </FilterDiv>
      </Container>
    </HeaderBar>
  );
};

export default Header;
