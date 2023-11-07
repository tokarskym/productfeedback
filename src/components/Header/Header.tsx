import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

//COMPONENTS
import FilteredOption from './FilteredOption';

import ArrowDown from '../../images/shared/icon-arrow-down.svg';
import ArrowUp from '../../images/shared/icon-arrow-up.svg';

//STYLES
import { HeaderBar, FilterDiv, FilterButton, FilterModal, HorizontalRule, ButtonAndModalContainer } from './HeaderStyles';
import { PrimaryButton } from '../GlobalStyles/ReusedStyles';

//TS
import { ProductRequest } from '../../data/data';

interface HeaderProps {
  handleFilterChange: (filter: string) => void;
  requestList: ProductRequest[];
  selectedFilter: string;
}
const filterOptions = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];

const Header: React.FC<HeaderProps> = ({ handleFilterChange, requestList, selectedFilter }) => {
  const [filterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const createNewRequest = () => {
    const newID = requestList.length + 1;
    navigate(`/requests/${newID}/new`);
  };

  const toggleModal: () => void = () => {
    setIsFilterModalOpen((prevState) => !prevState);
  };

  const handleOptionChange = (value: string) => {
    handleFilterChange(value);
    toggleModal();
  };

  return (
    <HeaderBar>
      <FilterDiv>
        <ButtonAndModalContainer>
          <p>Sort by :</p>
          <FilterButton onClick={toggleModal}>
            <h4>{selectedFilter}</h4>
            <img src={filterModalOpen ? ArrowUp : ArrowDown} alt={filterModalOpen ? 'Arrow Up' : 'Arrow Down'} />
          </FilterButton>
          {filterModalOpen && (
            <FilterModal>
              {filterOptions.map((option) => (
                <React.Fragment key={option}>
                  <FilteredOption label={option} value={option} selectedValue={selectedFilter} onValueChange={handleOptionChange} />
                  <HorizontalRule />
                </React.Fragment>
              ))}
            </FilterModal>
          )}
        </ButtonAndModalContainer>
        <PrimaryButton onClick={createNewRequest}>+ Add Feedback</PrimaryButton>
      </FilterDiv>
    </HeaderBar>
  );
};

export default Header;
