import { data } from '../../data/data';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Container } from '../GlobalStyles/ReusedStyles';

import RequestSingleElement from '../RequestSingleElement/RequestSingleElement';

import { ProductRequest } from '../../data/data';

const SuggestionsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface MainPageProps {
  selectedFilter: string;
  selectedCategory: string;
  requestList: ProductRequest[];
  calculateCommentNumbers: (request: ProductRequest) => number;
}

const MainPage: React.FC<MainPageProps> = ({ selectedFilter, selectedCategory, requestList, calculateCommentNumbers }) => {
  const productSuggestions = requestList.filter((request) => request.status === 'suggestion');
  const [sortedSuggestions, setSortedSuggestions] = useState<ProductRequest[]>(productSuggestions);

  useEffect(() => {
    const newProductSuggestions = requestList.filter((request) => request.status === 'suggestion');
    setSortedSuggestions(newProductSuggestions);
  }, [requestList]);

  useEffect(() => {
    const newSortedSuggestions = [...sortedSuggestions];

    if (selectedFilter === 'Most Upvotes') {
      newSortedSuggestions.sort((a, b) => b.upvotes - a.upvotes);
    } else if (selectedFilter === 'Least Upvotes') {
      newSortedSuggestions.sort((a, b) => a.upvotes - b.upvotes);
    } else if (selectedFilter === 'Most Comments') {
      newSortedSuggestions.sort((a, b) => calculateCommentNumbers(b) - calculateCommentNumbers(a));
    } else if (selectedFilter === 'Least Comments') {
      newSortedSuggestions.sort((a, b) => calculateCommentNumbers(a) - calculateCommentNumbers(b));
    }
    setSortedSuggestions(newSortedSuggestions);
  }, [selectedFilter]);

  useEffect(() => {
    const newSortedSuggestions = [...sortedSuggestions];

    if (selectedCategory === 'All') {
      setSortedSuggestions([...productSuggestions]);
    } else if (selectedCategory === 'Bug') {
      const bugSuggestions = newSortedSuggestions.filter((suggestion) => suggestion.category === selectedCategory.toLowerCase());
      setSortedSuggestions(bugSuggestions);
    } else if (selectedCategory === 'Enhancement') {
      const enhacementSuggestions = newSortedSuggestions.filter((suggestion) => suggestion.category === selectedCategory.toLowerCase());
      setSortedSuggestions(enhacementSuggestions);
    } else if (selectedCategory === 'Feature') {
      const featureSuggestions = newSortedSuggestions.filter((suggestion) => suggestion.category === selectedCategory.toLowerCase());
      setSortedSuggestions(featureSuggestions);
    } else if (selectedCategory === 'UX') {
      const uxSuggestion = newSortedSuggestions.filter((suggestion) => suggestion.category === selectedCategory.toUpperCase());
      setSortedSuggestions(uxSuggestion);
    } else if (selectedCategory === 'UI') {
      const uiSuggestion = newSortedSuggestions.filter((suggestion) => suggestion.category === selectedCategory.toUpperCase());
      setSortedSuggestions(uiSuggestion);
    }
  }, [selectedCategory]);

  return (
    <SuggestionsContainer>
      {sortedSuggestions.map((request) => {
        return (
          <Link key={request.id} to={`/requests/${request.id}`}>
            <RequestSingleElement request={request} calculateCommentNumbers={calculateCommentNumbers} />
          </Link>
        );
      })}
    </SuggestionsContainer>
  );
};

export default MainPage;
