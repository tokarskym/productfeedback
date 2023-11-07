import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ReturnButtonSVG from '../../images/shared//icon-arrow-left-white.svg';
// STYLES

import { ProductRequestNavbar, ReturnButton } from '../RequestDetails/RequestDetails';
import { PrimaryButton } from '../GlobalStyles/ReusedStyles';

const RoadmapNavbar = styled(ProductRequestNavbar)`
  height: 100px;
  background-color: #373f68;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonRoadmapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackButtonRoadmap: React.FC = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <RoadmapNavbar>
      <ButtonRoadmapWrapper>
        <ReturnButton style={{ color: 'white' }} onClick={handleReturn}>
          <img src={ReturnButtonSVG} alt="Arrow Left / Go Back" />
          Go Back
        </ReturnButton>
        <h3 style={{ color: 'white' }}>Roadmap</h3>
      </ButtonRoadmapWrapper>
      <PrimaryButton>+Add feedback</PrimaryButton>
    </RoadmapNavbar>
  );
};

export default BackButtonRoadmap;
