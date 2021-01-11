import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';

import Routes from './routes';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    <GlobalStyles />
  </BrowserRouter>
);

export default App;
