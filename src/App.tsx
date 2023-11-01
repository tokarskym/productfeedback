import GlobalStyle from './components/GlobalStyles/GlobalStyles';
import theme from './components/GlobalStyles/Theme';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import RequestDetails from './components/RequestDetails/RequestDetails';

import { ProductRequest } from './data/data';

import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { data } from './data/data';

function App() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Least Upvotes');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const productRequests = data.productRequests;
  const currentUser = data.currentUser;
  const [requestList, setRequestList] = useState<ProductRequest[]>(productRequests);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const addComment = (productRequestID: number, newCommentContent: string) => {
    const updatedRequestList = requestList.map((request) => {
      if (request.id === productRequestID) {
        const newComment = {
          id: request.comments ? Math.max(...request.comments.map((c) => c.id)) + 1 : 1,
          content: newCommentContent,
          user: currentUser,
        };
        return {
          ...request,
          comments: [...(request.comments || []), newComment],
        };
      }

      return request;
    });
    setRequestList(updatedRequestList);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/requests/:id" element={<RequestDetails requestList={requestList} onAddNewComment={addComment} />} />
          <Route
            path="/"
            element={
              <>
                <Navbar handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
                <Header handleFilterChange={handleFilterChange} />
                <MainPage selectedFilter={selectedFilter} selectedCategory={selectedCategory} requestList={requestList} />
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
