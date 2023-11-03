import GlobalStyle from './components/GlobalStyles/GlobalStyles';
import theme from './components/GlobalStyles/Theme';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import RequestDetails from './components/RequestDetails/RequestDetails';
import RequestForm from './components/RequestForm/RequestForm';

import { ProductRequest } from './data/data';

import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { updatedData } from './data/data';


function App() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Least Upvotes');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const productRequests = updatedData.productRequests;
  const currentUser = updatedData.currentUser;
  const [requestList, setRequestList] = useState<ProductRequest[]>(productRequests);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const addComment = (productRequestID: number, newCommentContent: string) => {
    console.log('wywołuje');
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
    console.log('działa xxxx');
  };

  const calculateCommentNumbers = (request: ProductRequest): number => {
    if (!request.comments) {
      return 0;
    }
    return request.comments.reduce((total, comment) => {
      return total + 1 + (comment.replies ? comment.replies.length : 0);
    }, 0);
  };

  const addReply = (productRequestID: number, commentID: number, newReplyContent: string, replyingToUsername: string) => {
    const updatedRequestList = requestList.map((request) => {
      if (request.id === productRequestID) {
        const updatedComments = request.comments?.map((comment) => {
          if (comment.id === commentID) {
            const newReply = {
              id: comment.replies ? Math.max(0, ...comment.replies.map((r) => r.id || 0)) + 1 : 1,
              content: newReplyContent,
              replyingTo: replyingToUsername,
              user: currentUser,
            };
            return {
              ...comment,
              replies: [...(comment?.replies || []), newReply],
            };
          }
          return comment;
        });
        return {
          ...request,
          comments: updatedComments,
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
          <Route
            path="/requests/:id"
            element={<RequestDetails requestList={requestList} onAddNewComment={addComment} onAddReply={addReply} calculateCommentNumbers={calculateCommentNumbers} />}
          />
          <Route path="/requests/:id/new" element={<RequestForm />} />
          <Route
            path="/"
            element={
              <>
                <Navbar handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
                <Header handleFilterChange={handleFilterChange} requestList={requestList} />
                <MainPage selectedFilter={selectedFilter} selectedCategory={selectedCategory} requestList={requestList} calculateCommentNumbers={calculateCommentNumbers} />
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
