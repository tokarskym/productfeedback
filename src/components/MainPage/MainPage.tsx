import styled from 'styled-components';
import { data } from '../../data/data';

import { useEffect, useState } from 'react';
import { ProductRequest } from '../../data/data';

import { Container } from '../GlobalStyles/ReusedStyles';
import { ButtonTag } from '../Navbar/NavbarStyles';

import { capitalizeFirstLetter } from '../../Utils/Functions';

import ArrowUpBlueSVG from '../../images/shared/icon-arrow-up-blue.svg';
import CommentSVG from '../../images/shared/icon-comments.svg';

const SuggestionsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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

interface MainPageProps {
  selectedFilter: string;
}
const MainPage: React.FC<MainPageProps> = ({ selectedFilter }) => {
  const productRequests = data.productRequests;
  const productSuggestions = productRequests.filter((productRequest) => productRequest.status === 'suggestion');
  const [sortedSuggestions, setSortedSuggestions] = useState<ProductRequest[]>(productSuggestions);

  useEffect(() => {
    const newSortedSuggestions = [...productSuggestions];

    if (selectedFilter === 'Most Upvotes') {
      newSortedSuggestions.sort((a, b) => b.upvotes - a.upvotes);
    } else if (selectedFilter === 'Least Upvotes') {
      newSortedSuggestions.sort((a, b) => a.upvotes - b.upvotes);
    } else if (selectedFilter === 'Most Comments') {
      newSortedSuggestions.sort((a, b) => (b?.comments?.length || 0) - (a?.comments?.length || 0));
    } else if (selectedFilter === 'Least Comments') {
      newSortedSuggestions.sort((a, b) => (a?.comments?.length || 0) - (b?.comments?.length || 0));
    }
    setSortedSuggestions(newSortedSuggestions);
  }, [selectedFilter]);


  

  return (
    <SuggestionsContainer>
      {sortedSuggestions.map((request) => {
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
      })}
    </SuggestionsContainer>
  );
};

export default MainPage;
