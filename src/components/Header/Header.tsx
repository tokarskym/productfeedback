import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

//COMPONENTS
import FilteredOption from './FilteredOption';

import ArrowDown from '../../images/shared/icon-arrow-down.svg';
import ArrowUp from '../../images/shared/icon-arrow-up.svg';
import SuggestionIconSVG from '../../images/shared/icon-suggestions.svg';

//STYLES
import { HeaderBar, FilterDiv, FilterButton, FilterModal, HorizontalRule, ButtonAndModalContainer } from './HeaderStyles';
import { PrimaryButton } from '../GlobalStyles/ReusedStyles';
import { NavbarContainer, Logo, AppName } from '../Navbar/NavbarStyles';
import { TabletLogoContainer } from '../Navbar/Navbar';
import TagsList from '../Navbar/TagsList';
import RoadmapList from '../Navbar/RoadmapList';

import { CountsType } from '../../App';

//TS
import { ProductRequest } from '../../data/data';

const NavbarFixed = styled(NavbarContainer)`
  display: none;
  @media (min-width: 1440px) {
    display: flex;
    flex-direction: column;
    position: fixed; 
    top: 0; 
    left 0; 
    margin-left: 20px; 
  }
`;

interface HeaderProps {
  handleFilterChange: (filter: string) => void;
  requestList: ProductRequest[];
  selectedFilter: string;
  isTablet: boolean;
  suggestionsLength: number;
  onCategoryChange: (categry: string) => void;
  statusCounts: CountsType;
  selectedCategory: string;
}
const filterOptions = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];

const Header: React.FC<HeaderProps> = ({ handleFilterChange, requestList, selectedFilter, isTablet, suggestionsLength, selectedCategory, statusCounts, onCategoryChange }) => {
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
      <FilterDiv style={{ position: 'relative' }}>
        <NavbarFixed style={{ position: 'absolute', top: '-10px', left: '-550px' }}>
          <TabletLogoContainer>
            <Logo>Frontend Mentor</Logo>
            <AppName>Feedback Board</AppName>
          </TabletLogoContainer>
          <TagsList selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
          <RoadmapList statusCounts={statusCounts} />
        </NavbarFixed>{' '}
        <ButtonAndModalContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isTablet && (
              <>
                <img style={{ marginRight: '20px' }} src={SuggestionIconSVG} alt="" />
                <h3>{suggestionsLength} Suggestions</h3>{' '}
              </>
            )}
            <p>Sort by :</p>
            <FilterButton onClick={toggleModal}>
              <h4>{selectedFilter}</h4>
              <img src={filterModalOpen ? ArrowUp : ArrowDown} alt={filterModalOpen ? 'Arrow Up' : 'Arrow Down'} />
            </FilterButton>
          </div>
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
