import { useState } from 'react';

import { HeaderBar, FilterDiv, FilterButton, FilterModal, HorizontalRule, ButtonAndModalContainer } from './HeaderStyles';
import { PrimaryButton } from '../GlobalStyles/ReusedStyles';

import ArrowDown from '../../images/shared/icon-arrow-down.svg';
import ArrowUp from '../../images/shared/icon-arrow-up.svg';

import FilteredOption from './FilteredOption';

interface HeaderProps {
  handleFilterChange: (filter: string) => void;
}

const Header: React.FC<HeaderProps> = ({ handleFilterChange }) => {
  const [filterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('Least Upvotes');

  const openFilterModal: () => void = () => {
    setIsFilterModalOpen(!filterModalOpen);
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    handleFilterChange(value);
    setIsFilterModalOpen(!filterModalOpen);
  };

  return (
    <HeaderBar>
      <FilterDiv>
        <ButtonAndModalContainer>
          <p>Sort by :</p>
          <FilterButton onClick={openFilterModal}>
            <h4>{selectedOption}</h4>
            <img src={filterModalOpen ? ArrowUp : ArrowDown} alt={filterModalOpen ? 'Arrow Up' : 'Arrow Down'} />
          </FilterButton>
          {filterModalOpen && (
            <FilterModal>
              <FilteredOption label="Most Upvotes" value="Most Upvotes" selectedValue={selectedOption} onChange={handleOptionChange} />
              <HorizontalRule />
              <FilteredOption label="Least Upvotes" value="Least Upvotes" selectedValue={selectedOption} onChange={handleOptionChange} />
              <HorizontalRule />
              <FilteredOption label="Most Comments" value="Most Comments" selectedValue={selectedOption} onChange={handleOptionChange} />
              <HorizontalRule />
              <FilteredOption label="Least Comments" value="Least Comments" selectedValue={selectedOption} onChange={handleOptionChange} />
            </FilterModal>
          )}
        </ButtonAndModalContainer>
        <PrimaryButton>+ Add Feedback</PrimaryButton>
      </FilterDiv>
    </HeaderBar>
  );
};

export default Header;
