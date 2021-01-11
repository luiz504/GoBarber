import React, { createContext, useCallback, useContext } from 'react';

import api from '../services/api';

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  name: string;
  signIn(credentials: ISignInCredentials): Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/sessions', { email, password });
      console.log(response); //eslint-disable-line
    } catch (err) {
      console.log(`err`, err); //eslint-disable-line
    }
  }, []);
  return (
    <AuthContext.Provider value={{ name: 'luiz,', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContenxt(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('You must use this hooks inside the Authcontext Provider');
  }

  return context;
}

export { AuthProvider, useAuthContenxt };
