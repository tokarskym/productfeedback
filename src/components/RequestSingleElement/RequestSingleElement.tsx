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
  isTablet?: boolean;
  $forceMobileStyle?: boolean;
}

export const SingleElement = styled.div<{ $status: string; $forceMobileStyle?: boolean }>`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  border-top: 10px solid ${(props) => getColorForStatus(props.$status)};
  @media (min-width: 768px) {
    display: ${(props) => (props.$forceMobileStyle ? 'block' : 'flex')};
    flex-direction: row;
    max-width: 890px;
    margin: 0 auto;
  }
`;
export const SpaceBetweenContainer = styled.div<{ $forceMobileStyle?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: ${(props) => (props.$forceMobileStyle ? '0' : '20px')};
}
  }
`;

export const RequestTitle = styled.h4`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
  margin-bottom: 10px;
  font-size: 13px;
`;

export const CommentTag = styled(RequestTitle)`
  margin-bottom: 0;
  display: inline-block;
  margin-left: 10px;
`;

export const RequestDescription = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 10px;
`;

export const UpvotesTag = styled(ButtonTag)<{ $forceMobileStyle?: boolean }>`
  color: ${(props) => props.theme.colors.darkerDarkBlue};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  cursor: pointer;
  @media (min-width: 768px) {
    flex-direction: ${(props) => (props.$forceMobileStyle ? 'initial' : 'column')};
    height: 50%;
  }
`;

const SpaceBetweenElements = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RequestSingleElement: React.FC<SingleRequestElementProps> = ({ request, calculateCommentNumbers, handleUpvote, isTablet, $forceMobileStyle }) => {
  const handleUpvoteChange = (event: React.MouseEvent<HTMLButtonElement>, request: ProductRequest) => {
    event.preventDefault();
    event.stopPropagation();
    handleUpvote(request);
  };

  return (
    <SingleElement key={request.id} $status={request.status} $forceMobileStyle={$forceMobileStyle}>
      {isTablet && (
        <>
          {request.status !== 'suggestion' && (
            <div style={{ marginBottom: '10px' }}>
              <Dot $status={request.status} />
              <p style={{ display: 'inline-block', color: '#647196 ' }}>{capitalizeFirstLetter(request.status)}</p>
            </div>
          )}
          <UpvotesTag style={{ display: $forceMobileStyle ? 'none' : 'inline-block' }} onClick={(e) => handleUpvoteChange(e, request)}>
            <img src={ArrowUpBlueSVG} alt="" />
            {request.upvotes}
          </UpvotesTag>
          <div style={{ display: $forceMobileStyle ? 'inline-block' : 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <SpaceBetweenContainer $forceMobileStyle={$forceMobileStyle}>
              <RequestTitle>{request.title}</RequestTitle>
              <RequestDescription>{request.description}</RequestDescription>
              <ButtonTag style={{ display: 'block', marginBottom: '10px' }}>{capitalizeFirstLetter(request.category)}</ButtonTag>
            </SpaceBetweenContainer>
            <div>
              <SpaceBetweenElements style={{ display: $forceMobileStyle ? 'flex' : 'inline-block' }}>
                <UpvotesTag $forceMobileStyle={$forceMobileStyle} style={{ display: $forceMobileStyle ? 'flex' : 'none' }} onClick={(e) => handleUpvoteChange(e, request)}>
                  <img src={ArrowUpBlueSVG} alt="" />
                  {request.upvotes}
                </UpvotesTag>
                <div>
                  <img src={CommentSVG} alt="" style={{ display: 'inline-block' }} />
                  <CommentTag>{calculateCommentNumbers(request)}</CommentTag>
                </div>
              </SpaceBetweenElements>
            </div>
          </div>
        </>
      )}

      {!isTablet && (
        <>
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
              <img src={ArrowUpBlueSVG} alt="" />
              {request.upvotes}
            </UpvotesTag>
            <SpaceBetweenContainer>
              <img src={CommentSVG} style={{ display: 'inline-block' }} alt="" />
              <CommentTag>{calculateCommentNumbers(request)}</CommentTag>
            </SpaceBetweenContainer>
          </SpaceBetweenContainer>
        </>
      )}
    </SingleElement>
  );
};
export default RequestSingleElement;
