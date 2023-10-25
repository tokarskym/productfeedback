import styled from 'styled-components';
import { useState } from 'react';

import { Container, PrimaryButton } from '../GlobalStyles/ReusedStyles';

import ArrowDown from '../../images/shared/icon-arrow-down.svg';
import ArrowUp from '../../images/shared/icon-arrow-up.svg';

import FilteredOption from './FilteredOption';

const HeaderBar = styled.div`
  width: 100%;
  height: 56px;
  background-color: ${(props) => props.theme.colors.darkBlue};
`;

const FilterDiv = styled(Container)`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;

const FilterButton = styled.button`
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

const FilterModal = styled.div`
  height: auto;
  width: 255px;
  border-radius: 10px;
  position: absolute;
  top: 40px;
  z-index: 1;
  background-color: white;
`;

const FilterModalBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header: React.FC = () => {
  const [filterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('Most Upvotes');

  const openFilterModal: () => void = () => {
    setIsFilterModalOpen(!filterModalOpen);
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setIsFilterModalOpen(!filterModalOpen);
  };

  return (
    <HeaderBar>
      <FilterDiv>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <p style={{ color: '#f2f4fe', fontSize: '13px' }}>Sort by :</p>
          <FilterButton onClick={openFilterModal}>
            <h4>{selectedOption}</h4>
            <img src={filterModalOpen ? ArrowUp : ArrowDown} alt={filterModalOpen ? 'Arrow Up' : 'Arrow Down'} />
          </FilterButton>
          {filterModalOpen && (
            <FilterModal>
              <FilterModalBody>
                <FilteredOption label="Most Upvotes" value="Most Upvotes" selectedValue={selectedOption} onChange={handleOptionChange} />
                <hr style={{ width: '100%', border: '1px solid red', margin: '0' }} />
                <FilteredOption label="Least Upvotes" value="Least Upvotes" selectedValue={selectedOption} onChange={handleOptionChange} />
                <hr style={{ width: '100%', border: '1px solid red', margin: '0' }} />
                <FilteredOption label="Most Comments" value="Most Comments" selectedValue={selectedOption} onChange={handleOptionChange} />
                <hr style={{ width: '100%', border: '1px solid red', margin: '0' }} />
                <FilteredOption label="Least Comments" value="Least Comments" selectedValue={selectedOption} onChange={handleOptionChange} />
              </FilterModalBody>
            </FilterModal>
          )}
        </div>
        <PrimaryButton>+ Add Feedback</PrimaryButton>
      </FilterDiv>
    </HeaderBar>
  );
};

export default Header;
