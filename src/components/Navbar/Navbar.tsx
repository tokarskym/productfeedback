import { useState } from 'react';
import { Link } from 'react-router-dom';

import Hamburger from '../../images/shared/mobile/icon-hamburger.svg';
import CloseHamburger from '../../images/shared/mobile/icon-close.svg';

import { capitalizeFirstLetter } from '../../Utils/Functions';

//STYlES
import { NavbarHeader, NavbarContainer, Logo, AppName, HamburgerButton, ModalBackground, ModalContainer, ListElement, TagsContainer, ButtonTag, Dot } from './NavbarStyles';
//TS
import { CountsType } from '../../App';

interface NavbarProps {
  handleCategoryChange: (category: string) => void;
  selectedCategory: string;
  statusCounts: CountsType;
}
const Navbar: React.FC<NavbarProps> = ({ statusCounts, handleCategoryChange, selectedCategory }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);

  const TagsArray: string[] = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

  const onCategoryChange = (category: string) => {
    handleCategoryChange(category);
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  const isValidStatus = (status: string): status is 'suggestion' | 'planned' | 'in-progress' | 'live' => {
    return ['suggestion', 'planned', 'in-progress', 'live'].includes(status);
  };

  return (
    <>
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
      <ModalBackground $display={isHamburgerOpen}>
        <ModalContainer className={isHamburgerOpen ? 'active' : ''}>
          <TagsContainer>
            {TagsArray.map((tag) => (
              <ButtonTag $isChosen={selectedCategory === tag} key={tag} onClick={() => onCategoryChange(tag)}>
                {tag}
              </ButtonTag>
            ))}
          </TagsContainer>
          <TagsContainer>
            <div
              style={{
                display: 'flex',
                gap: '60px',
                alignItems: 'center',
              }}
            >
              <h3>Roadmap</h3>
              <Link style={{ textDecoration: 'underline', color: 'blue' }} to={`/roadmap`}>
                View
              </Link>
            </div>
            <ul style={{ width: '100%' }}>
              {Object.keys(statusCounts).map((status) => {
                if (isValidStatus(status)) {
                  return (
                    <ListElement key={status}>
                      <div>
                        <Dot $status={status} />
                        <p style={{ display: 'inline-block', color: '#647196 ' }}>{capitalizeFirstLetter(status)}</p>
                      </div>
                      <h4 style={{ color: '#647196' }}>{statusCounts[status]}</h4>
                    </ListElement>
                  );
                }
                return null;
              })}
            </ul>
          </TagsContainer>
        </ModalContainer>
      </ModalBackground>
    </>
  );
};

export default Navbar;
