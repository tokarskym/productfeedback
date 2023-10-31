import GlobalStyle from './components/GlobalStyles/GlobalStyles';
import theme from './components/GlobalStyles/Theme';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';

import { ProductRequest } from './data/data';

import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { Route, Routes } from 'react-router';

import { data } from './data/data';

function App() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Least Upvotes');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const productRequests = data.productRequests;
  const [requestList, setRequestList] = useState<ProductRequest[]>(productRequests);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
      <Header handleFilterChange={handleFilterChange} />
      <MainPage selectedFilter={selectedFilter} selectedCategory={selectedCategory} requestList={requestList} />
    </ThemeProvider>
  );
}

export default App;

/**
 * 
 * 
 *       <Routes>
        <Route
          path="/invoices/:id"
          element={
            <RequestDetails
              requestList={...}
            />
          }
        />

      </Routes>
 */
