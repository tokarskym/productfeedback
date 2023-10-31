import { useState, useEffect } from 'react';

import Hamburger from '../../images/shared/mobile/icon-hamburger.svg';
import CloseHamburger from '../../images/shared/mobile/icon-close.svg';
import { capitalizeFirstLetter } from '../../Utils/Functions';

import { NavbarHeader, NavbarContainer, Logo, AppName, HamburgerButton, ModalBackground, ModalContainer, TagsContainer, ButtonTag, Dot } from './NavbarStyles';

import { data } from '../../data/data';

type CountsType = {
  [status: string]: number;
};

type ItemType = {
  status: string;
  [key: string]: any;
};

interface NavbarProps {
  handleCategoryChange: (category: string) => void;
  selectedCategory: string;
}
const Navbar: React.FC<NavbarProps> = ({ handleCategoryChange, selectedCategory }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const [statusCounts, setStatusCounts] = useState<CountsType>({});

  const TagsArray: string[] = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

  const requestsData = data.productRequests;

  useEffect(() => {
    const counts: CountsType = {};

    requestsData.forEach((item: ItemType) => {
      if (item.status === 'suggestion') {
        return;
      }

      if (!counts[item.status]) {
        counts[item.status] = 0;
      }
      counts[item.status]++;
    });

    setStatusCounts(counts);
  }, [requestsData]);

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
      <ModalBackground display={isHamburgerOpen}>
        <ModalContainer className={isHamburgerOpen ? 'active' : ''}>
          <TagsContainer>
            {TagsArray.map((tag) => (
              <ButtonTag isChosen={selectedCategory === tag} key={tag} onClick={() => handleCategoryChange(tag)}>
                {tag}
              </ButtonTag>
            ))}
          </TagsContainer>
          <TagsContainer>
            <h3>Roadmap</h3>
            <button>View</button>
            <ul style={{ width: '100%' }}>
              {Object.keys(statusCounts).map((status) => {
                if (isValidStatus(status)) {
                  return (
                    <li key={status} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <div>
                        <Dot status={status} />
                        <p style={{ display: 'inline-block', color: '#647196 ' }}>{capitalizeFirstLetter(status)}</p>
                      </div>
                      <h4 style={{ color: '#647196' }}>{statusCounts[status]}</h4>
                    </li>
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
