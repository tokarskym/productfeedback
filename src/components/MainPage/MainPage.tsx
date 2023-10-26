import { data } from '../../data/data';

import { useEffect, useState } from 'react';
import { ProductRequest } from '../../data/data';

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
    <div>
      {sortedSuggestions.map((product) => {
        return (
          <div key={product.id}>
            <p>{product.title}</p>
            <p>{product.upvotes} Upvotes</p> <p> Komentarze {product?.comments?.length || 0}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MainPage;
