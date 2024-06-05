import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import NameGeneratorForm from './components/NameGeneratorForm';
import NameDisplay from './components/NameDisplay';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './hooks/useAuth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2272FF',
    },
    background: {
      default: '#1D1D1D',
      paper: '#1D1D1D',
    },
    text: {
      primary: '#fff',
    },
  },
});

const App: React.FC = () => { 
  const { isAuthenticated } = useAuth();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {isAuthenticated ? (
              <>
                  <Route path="/generate" element={<NameGeneratorForm />} />
                  <Route path="/names" element={<NameDisplay />} />
              </>
              ) : (
              <Route path="/" element={<Login />} />
              )}
            </Routes>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
