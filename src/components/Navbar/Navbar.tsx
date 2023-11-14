import styled from 'styled-components';
import { useState } from 'react';

import Hamburger from '../../images/shared/mobile/icon-hamburger.svg';
import CloseHamburger from '../../images/shared/mobile/icon-close.svg';

//STYlES
import { NavbarHeader, NavbarContainer, Logo, AppName, HamburgerButton, ModalBackground, ModalContainer, TagsContainer } from './NavbarStyles';
//TS
import { CountsType } from '../../App';

import TagsList from './TagsList';
import RoadmapList from './RoadmapList';

export const TabletLogoContainer = styled(TagsContainer)`
  background-image: url('/images/backgroundheader/tablet/background-header.png');
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
  justify-content: flex-end;
  @media (min-width: 1024px) {
    background-image: url('/images/backgroundheader/desktop/background-header.png');
    max-width: 255px;
  }
`;

interface NavbarProps {
  handleCategoryChange: (category: string) => void;
  selectedCategory: string;
  statusCounts: CountsType;
  isTablet: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ statusCounts, handleCategoryChange, selectedCategory, isTablet }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);

  const onCategoryChange = (category: string) => {
    handleCategoryChange(category);
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <>
      {!isTablet && (
        <NavbarHeader>
          <NavbarContainer>
            <div>
              <Logo>Frontend Mentor</Logo>
              <AppName>Feedback Board</AppName>
            </div>
            <HamburgerButton onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
              <img src={isHamburgerOpen ? CloseHamburger : Hamburger} alt={isHamburgerOpen ? 'Close Hamburger Icon' : 'Hamburger Icon'} />
            </HamburgerButton>
          </NavbarContainer>
        </NavbarHeader>
      )}
      {isTablet && (
        <NavbarContainer>
          <TabletLogoContainer style={{ flex: '1' }}>
            <Logo>Frontend Mentor</Logo>
            <AppName>Feedback Board</AppName>
          </TabletLogoContainer>
          <TagsList selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
          <RoadmapList statusCounts={statusCounts} />
        </NavbarContainer>
      )}

      {!isTablet && (
        <ModalBackground $display={isHamburgerOpen}>
          <ModalContainer className={isHamburgerOpen ? 'active' : ''}>
            <TagsList selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
            <RoadmapList statusCounts={statusCounts} />
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default Navbar;
