import GlobalStyle from './components/GlobalStyles/GlobalStyles';
import theme from './components/GlobalStyles/Theme';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import RequestDetails from './components/RequestDetails/RequestDetails';
import RequestForm from './components/RequestForm/RequestForm';
import Roadmap from './components/Roadmap/Roadmap';

import { ProductRequest } from './data/data';

import { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { updatedData } from './data/data';

export type CountsType = {
  [status: string]: number;
};

type ItemType = {
  status: string;
  [key: string]: any;
};

function App() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Least Upvotes');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const productRequests = updatedData.productRequests;
  const currentUser = updatedData.currentUser;
  const [requestList, setRequestList] = useState<ProductRequest[]>(productRequests);
  const [statusCounts, setStatusCounts] = useState<CountsType>({});
  const [suggestionsLength, setSuggestionsLength] = useState<number>(0);

  useEffect(() => {
    const counts: CountsType = {};

    requestList.forEach((item: ItemType) => {
      if (item.status === 'suggestion') {
        return;
      }
      if (!counts[item.status]) {
        counts[item.status] = 0;
      }
      counts[item.status]++;
    });

    setStatusCounts(counts);
  }, [requestList]);

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

  const handleAddProductRequest = (newProductRequest: ProductRequest) => {
    const updatedProductRequests: ProductRequest[] = [...requestList, newProductRequest];
    setRequestList(updatedProductRequests);
    console.log(updatedProductRequests);
  };

  const handleDeleteProductRequest = (id: number) => {
    const updatedProductRequests = productRequests.filter((request) => request.id !== id);
    setRequestList(updatedProductRequests);
  };

  const handleEditProductRequest = (updatedProductRequest: ProductRequest, data: any) => {
    const updatedProductRequests = requestList.map((request) => {
      if (request.id === updatedProductRequest.id) {
        return {
          ...updatedProductRequest,
          ...data,
        };
      } else {
        return request;
      }
    });
    setRequestList(updatedProductRequests);
  };

  const handleUpvote = (updatedProductRequest: ProductRequest) => {
    const updatedProductRequests = requestList.map((request) => {
      if (request.id === updatedProductRequest.id) {
        return {
          ...updatedProductRequest,
          upvotes: updatedProductRequest.upvotes + 1,
        };
      } else {
        return request;
      }
    });
    setRequestList(updatedProductRequests);
  };

  //

  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const updateWidth = () => {
      setIsTablet(window.innerWidth >= 768);
    };

    window.addEventListener('resize', updateWidth);

    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route
            path="/requests/:id"
            element={
              <RequestDetails
                requestList={requestList}
                onAddNewComment={addComment}
                onAddReply={addReply}
                calculateCommentNumbers={calculateCommentNumbers}
                handleUpvote={handleUpvote}
                isTablet={isTablet}
              />
            }
          />
          <Route
            path="/roadmap"
            element={
              <Roadmap requestList={requestList} statusCounts={statusCounts} calculateCommentNumbers={calculateCommentNumbers} handleUpvote={handleUpvote} isTablet={isTablet} />
            }
          />
          <Route
            path="/requests/:id/new"
            element={
              <RequestForm
                handleDeleteProductRequest={handleDeleteProductRequest}
                handleEditProductRequest={handleEditProductRequest}
                handleAddProductRequest={handleAddProductRequest}
                mode="new"
                requestList={requestList}
              />
            }
          />
          <Route
            path="/requests/:id/edit"
            element={
              <RequestForm
                handleDeleteProductRequest={handleDeleteProductRequest}
                handleEditProductRequest={handleEditProductRequest}
                handleAddProductRequest={handleAddProductRequest}
                mode="edit"
                requestList={requestList}
              />
            }
          />

          <Route
            path="/"
            element={
              <>
                <Navbar statusCounts={statusCounts} handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} isTablet={isTablet} />
                <Header
                  handleFilterChange={handleFilterChange}
                  requestList={requestList}
                  selectedFilter={selectedFilter}
                  isTablet={isTablet}
                  suggestionsLength={suggestionsLength}
                  statusCounts={statusCounts}
                  onCategoryChange={handleCategoryChange}
                  selectedCategory={selectedCategory}
                />
                <MainPage
                  selectedFilter={selectedFilter}
                  selectedCategory={selectedCategory}
                  requestList={requestList}
                  calculateCommentNumbers={calculateCommentNumbers}
                  handleUpvote={handleUpvote}
                  setSuggestionsLength={setSuggestionsLength}
                  isTablet={isTablet}
                />
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
