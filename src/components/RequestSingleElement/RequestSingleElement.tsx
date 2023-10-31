import styled from 'styled-components';

import { ProductRequest } from '../../data/data';
import { Container } from '../GlobalStyles/ReusedStyles';
import { ButtonTag } from '../Navbar/NavbarStyles';

import ArrowUpBlueSVG from '../../images/shared/icon-arrow-up-blue.svg';
import CommentSVG from '../../images/shared/icon-comments.svg';

import { capitalizeFirstLetter } from '../../Utils/Functions';

interface SingleRequestElementProps {
  request: ProductRequest;
}

const SuggestionSingleElement = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 10px;
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
`;

const RequestSingleElement: React.FC<SingleRequestElementProps> = ({ request }) => {
  return (
    <SuggestionSingleElement key={request.id}>
      <RequestTitle>{request.title}</RequestTitle>
      <RequestDescription>{request.description}</RequestDescription>
      <ButtonTag style={{ display: 'block', marginBottom: '10px' }}>{capitalizeFirstLetter(request.category)}</ButtonTag>
      <SpaceBetweenContainer>
        <UpvotesTag>
          <img src={ArrowUpBlueSVG} />
          {request.upvotes}
        </UpvotesTag>
        <SpaceBetweenContainer>
          <img src={CommentSVG} style={{ display: 'inline-block' }} />
          <CommentTag>{request?.comments?.length || 0}</CommentTag>
        </SpaceBetweenContainer>
      </SpaceBetweenContainer>
    </SuggestionSingleElement>
  );
};

export default RequestSingleElement;
