import GlobalStyle from './components/GlobalStyles/GlobalStyles';
import theme from './components/GlobalStyles/Theme';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';

import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Header />
    </ThemeProvider>
  );
}

export default App;
