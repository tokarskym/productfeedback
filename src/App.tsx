import GlobalStyle from './components/GlobalStyles/GlobalStyles';
import theme from './components/GlobalStyles/Theme';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';

import { ThemeProvider } from 'styled-components';
import { useState } from 'react';

function App() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Least Upvotes');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Header handleFilterChange={handleFilterChange} />
      <MainPage selectedFilter={selectedFilter} />
    </ThemeProvider>
  );
}

export default App;
