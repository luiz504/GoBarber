import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';

import Routes from './routes';

import Provider from './hooks';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => (
  <BrowserRouter>
    <Provider>
      <ToastContainer />
      <Routes />
    </Provider>
    <GlobalStyles />
  </BrowserRouter>
);

export default App;
