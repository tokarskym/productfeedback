import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReturnButtonSVG from '../../images/shared//icon-arrow-left-white.svg';

import { ProductRequestNavbar, ReturnButton } from '../RequestDetails/RequestDetails';
import { PrimaryButton } from '../GlobalStyles/ReusedStyles';

const ReturnButtonRoadmap = styled(ReturnButton)`
  color: white;
`;

const RoadmapTitle = styled.h3`
  color: #ffff;
`;

interface BackButtonProps {}
const BackButtonRoadmap: React.FC<BackButtonProps> = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <ProductRequestNavbar style={{ height: '100px', backgroundColor: '#373F68', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <ReturnButtonRoadmap onClick={handleReturn}>
          <img src={ReturnButtonSVG} alt="Arrow Left / Go Back" />
          Go Back
        </ReturnButtonRoadmap>
        <RoadmapTitle>Roadmap</RoadmapTitle>
      </div>
      <PrimaryButton>+Add feedback</PrimaryButton>
    </ProductRequestNavbar>
  );
};

export default BackButtonRoadmap;
