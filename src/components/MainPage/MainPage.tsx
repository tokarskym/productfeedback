import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useEffect } from 'react';

//STYLES
import { Container, PrimaryButton } from '../GlobalStyles/ReusedStyles';

//COMPONTENTS
import RequestSingleElement from '../RequestSingleElement/RequestSingleElement';
//TS
import { ProductRequest } from '../../data/data';

import NoFeedbackSVG from '../../images/shared/illustration-empty.svg';

const SuggestionsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 140px;
  margin-bottom: 100px;
  @media (min-width: 768px) {
    padding-top: 0;
    margin-top: 40px;
    max-width: 890px;
  }
`;

const EmptyPic = styled.img`
  height: 102px;
  width: 108px;
`;

const NoFeedbackWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: auto;
  padding: 50px 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;

  & p {
    text-align: center;
    color: ${(props) => props.theme.colors.gray};
    font-size: 13px;
  }

  & h2 {
    color: ${(props) => props.theme.colors.darkerDarkBlue};
  }

  @media (min-width: 768px) {
    max-width: 890px;
    margin: 0 auto;
  }
`;

interface MainPageProps {
  selectedFilter: string;
  requestList: ProductRequest[];
  calculateCommentNumbers: (request: ProductRequest) => number;
  handleUpvote: (updatedProductRequest: ProductRequest) => void;
  setSuggestionsLength: (suggestionsLength: number) => void;
  isTablet: boolean;
  selectedCategory: string;
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

const MainPage: React.FC<MainPageProps> = ({ selectedFilter, selectedCategory, requestList, calculateCommentNumbers, handleUpvote, setSuggestionsLength, isTablet }) => {
  const sortedSuggestions = useMemo(() => {
    let filteredSuggestions = requestList.filter((request) => request.status === 'suggestion');

    if (selectedCategory !== 'All') {
      const categoryFilter = selectedCategory === 'UI' || selectedCategory === 'UX' ? selectedCategory.toUpperCase() : selectedCategory.toLowerCase();
      filteredSuggestions = filteredSuggestions.filter((suggestion) => suggestion.category === categoryFilter);
    }

    const sortFunction = getSortFunction(selectedFilter, calculateCommentNumbers);
    return sortFunction ? [...filteredSuggestions].sort(sortFunction) : filteredSuggestions;
  }, [requestList, selectedFilter, selectedCategory, calculateCommentNumbers]);

  useEffect(() => {
    setSuggestionsLength(sortedSuggestions.length);
  }, [sortedSuggestions.length]);

  const navigate = useNavigate();

  const createNewRequest = () => {
    const newID = requestList.length + 1;
    navigate(`/requests/${newID}/new`);
  };

  return (
    <SuggestionsContainer>
      {sortedSuggestions.map((request) => (
        <Link key={request.id} to={`/requests/${request.id}`}>
          <RequestSingleElement request={request} calculateCommentNumbers={calculateCommentNumbers} handleUpvote={handleUpvote} isTablet={isTablet} />
        </Link>
      ))}
      {sortedSuggestions.length === 0 && (
        <NoFeedbackWrapper>
          <EmptyPic src={NoFeedbackSVG} alt="There is no feedback in this category picture" />
          <h2>There is no feedback yet.</h2>
          <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
          <PrimaryButton onClick={createNewRequest}>+ Add feedback</PrimaryButton>
        </NoFeedbackWrapper>
      )}
    </SuggestionsContainer>
  );
};

export default MainPage;
