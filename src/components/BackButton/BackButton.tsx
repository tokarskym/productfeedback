import { useNavigate } from 'react-router-dom';

import { ProductRequestNavbar, ReturnButton, EditFeedbackButton } from '../RequestDetails/RequestDetails';

import ReturnButtonSVG from '../../images/shared//icon-arrow-left.svg';

interface BackButtonProps {
  isEdit?: boolean;
  requestID?: number;
}
const BackButton: React.FC<BackButtonProps> = ({ isEdit, requestID }) => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  const editRequest = () => {
    const editedRequestID = requestID;
    navigate(`/requests/${editedRequestID}/edit`);
  };

  return (
    <ProductRequestNavbar>
      <ReturnButton onClick={handleReturn}>
        <img src={ReturnButtonSVG} alt="Arrow Left / Go Back" />
        Go Back
      </ReturnButton>
      {isEdit && <EditFeedbackButton onClick={editRequest}>Edit Feedback</EditFeedbackButton>}
    </ProductRequestNavbar>
  );
};

export default BackButton;
