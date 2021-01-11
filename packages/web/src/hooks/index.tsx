import React from 'react';
import { AuthProvider } from './AuthContext';

// import { Container } from './styles';

const Provider: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Provider;
