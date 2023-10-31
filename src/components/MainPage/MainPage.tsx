import { data } from '../../data/data';
import styled from 'styled-components';

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
}

const MainPage: React.FC<MainPageProps> = ({ selectedFilter, selectedCategory, requestList }) => {
  const productSuggestions = requestList.filter((request) => request.status === 'suggestion');
  const [sortedSuggestions, setSortedSuggestions] = useState<ProductRequest[]>(productSuggestions);

  useEffect(() => {
    const newSortedSuggestions = [...sortedSuggestions];

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

  useEffect(() => {
    const newSortedSuggestions = [...productSuggestions];

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
      const uxSuggestion = newSortedSuggestions.filter((suggestion) => suggestion.category === selectedCategory.toLowerCase());
      setSortedSuggestions(uxSuggestion);
    } else if (selectedCategory === 'UI') {
      const uiSuggestion = newSortedSuggestions.filter((suggestion) => suggestion.category === selectedCategory.toLowerCase());
      setSortedSuggestions(uiSuggestion);
    }
  }, [selectedCategory]);

  return (
    <SuggestionsContainer>
      {sortedSuggestions.map((request) => {
        return <RequestSingleElement request={request} />;
      })}
    </SuggestionsContainer>
  );
};

export default MainPage;
