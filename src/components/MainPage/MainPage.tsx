import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { useMemo } from 'react';

//STYLES
import { Container } from '../GlobalStyles/ReusedStyles';
//COMPONTENTS
import RequestSingleElement from '../RequestSingleElement/RequestSingleElement';
//TS
import { ProductRequest } from '../../data/data';

const SuggestionsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 140px;
  margin-bottom: 100px;
`;

interface MainPageProps {
  selectedFilter: string;
  selectedCategory: string;
  requestList: ProductRequest[];
  calculateCommentNumbers: (request: ProductRequest) => number;
}

const getSortFunction = (selectedFilter: string, calculateCommentNumbers: (request: ProductRequest) => number): ((a: ProductRequest, b: ProductRequest) => number) | undefined => {
  switch (selectedFilter) {
    case 'Most Upvotes':
      return (a: ProductRequest, b: ProductRequest) => b.upvotes - a.upvotes;
    case 'Least Upvotes':
      return (a: ProductRequest, b: ProductRequest) => a.upvotes - b.upvotes;
    case 'Most Comments':
      return (a: ProductRequest, b: ProductRequest) => calculateCommentNumbers(b) - calculateCommentNumbers(a);
    case 'Least Comments':
      return (a: ProductRequest, b: ProductRequest) => calculateCommentNumbers(a) - calculateCommentNumbers(b);
    default:
      return undefined;
  }
};

const MainPage: React.FC<MainPageProps> = ({ selectedFilter, selectedCategory, requestList, calculateCommentNumbers }) => {

  const sortedSuggestions = useMemo(() => {
    let filteredSuggestions = requestList.filter((request) => request.status === 'suggestion');
    
    if (selectedCategory !== 'All') {
      const categoryFilter = selectedCategory === 'UI' || selectedCategory === 'UX' ? selectedCategory.toUpperCase() : selectedCategory.toLowerCase();

      filteredSuggestions = filteredSuggestions.filter((suggestion) => suggestion.category === categoryFilter);
    }

    const sortFunction = getSortFunction(selectedFilter, calculateCommentNumbers);

    return sortFunction ? [...filteredSuggestions].sort(sortFunction) : filteredSuggestions;
  }, [requestList, selectedFilter, selectedCategory, calculateCommentNumbers]);

  return (
    <SuggestionsContainer>
      {sortedSuggestions.map((request) => (
        <Link key={request.id} to={`/requests/${request.id}`}>
          <RequestSingleElement request={request} calculateCommentNumbers={calculateCommentNumbers} />
        </Link>
      ))}
    </SuggestionsContainer>
  );
};

export default MainPage;
