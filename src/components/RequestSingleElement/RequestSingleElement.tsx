import styled from 'styled-components';

import { ProductRequest } from '../../data/data';
import { ButtonTag } from '../Navbar/NavbarStyles';

import ArrowUpBlueSVG from '../../images/shared/icon-arrow-up-blue.svg';
import CommentSVG from '../../images/shared/icon-comments.svg';

import { capitalizeFirstLetter } from '../../Utils/Functions';
import { Dot } from '../Navbar/NavbarStyles';
import { getColorForStatus } from '../../Utils/Functions';

interface SingleRequestElementProps {
  request: ProductRequest;
  calculateCommentNumbers: (request: any) => number;
  status?: string;
  handleUpvote: (updatedProductRequest: ProductRequest) => void;
}

export const SingleElement = styled.div<{ status: string }>`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  border-top: 10px solid ${(props) => getColorForStatus(props.status)};
`;
const SpaceBetweenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RequestTitle = styled.h4`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
  margin-bottom: 10px;
  font-size: 13px;
`;

const CommentTag = styled(RequestTitle)`
  margin-bottom: 0;
  display: inline-block;
  margin-left: 10px;
`;

const RequestDescription = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 10px;
`;

const UpvotesTag = styled(ButtonTag)`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  cursor: pointer;
  :hover {
    color: red;
  }
`;

const RequestSingleElement: React.FC<SingleRequestElementProps> = ({ request, calculateCommentNumbers, status, handleUpvote }) => {
  const handleUpvoteChange = (event: React.MouseEvent<HTMLButtonElement>, request: ProductRequest) => {
    event.preventDefault();
    event.stopPropagation();
    handleUpvote(request);
  };

  return (
    <SingleElement key={request.id} status={request.status}>
      {request.status !== 'suggestion' && (
        <div style={{ marginBottom: '10px' }}>
          <Dot $status={request.status} />
          <p style={{ display: 'inline-block', color: '#647196 ' }}>{capitalizeFirstLetter(request.status)}</p>
        </div>
      )}
      <RequestTitle>{request.title}</RequestTitle>
      <RequestDescription>{request.description}</RequestDescription>
      <ButtonTag style={{ display: 'block', marginBottom: '10px' }}>{capitalizeFirstLetter(request.category)}</ButtonTag>
      <SpaceBetweenContainer>
        <UpvotesTag onClick={(e) => handleUpvoteChange(e, request)}>
          <img src={ArrowUpBlueSVG} />
          {request.upvotes}
        </UpvotesTag>
        <SpaceBetweenContainer>
          <img src={CommentSVG} style={{ display: 'inline-block' }} />
          <CommentTag>{calculateCommentNumbers(request)}</CommentTag>
        </SpaceBetweenContainer>
      </SpaceBetweenContainer>
    </SingleElement>
  );
};

export default RequestSingleElement;
