import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/global';

import Routes from './routes';

import Provider from './hooks';

const App: React.FC = () => (
  <BrowserRouter>
    <Provider>
      <Routes />
    </Provider>
    <GlobalStyles />
  </BrowserRouter>
);

export default App;
