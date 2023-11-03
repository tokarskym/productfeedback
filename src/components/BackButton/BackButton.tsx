import { useNavigate } from 'react-router-dom';

import { ProductRequestNavbar, ReturnButton, EditFeedbackButton } from '../RequestDetails/RequestDetails';

import ReturnButtonSVG from '../../images/shared//icon-arrow-left.svg';

interface BackButtonProps {
  isEdit: boolean;
}
const BackButton: React.FC<BackButtonProps> = ({ isEdit }) => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <ProductRequestNavbar>
      <ReturnButton onClick={handleReturn}>
        <img src={ReturnButtonSVG} alt="Arrow Left / Go Back" />
        Go Back
      </ReturnButton>
      {isEdit && <EditFeedbackButton>Edit Feedback</EditFeedbackButton>}
    </ProductRequestNavbar>
  );
};

export default BackButton;
