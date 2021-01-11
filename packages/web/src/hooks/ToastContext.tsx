import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 } from 'uuid';
import ToastContainer from '../components/ToastContainer';

export interface IToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}
interface IToastContextData {
  addToast(data: Omit<IToastMessage, 'id'>): void;
  removeToast(): void;
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToastMessage, 'id'>) => {
      const id = v4();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(old => [...old, toast]);
    },
    [],
  );
  const removeToast = useCallback(() => {
    console.log(`remove`); //eslint-disable-line
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer messages={messages} />
      {children}
    </ToastContext.Provider>
  );
};

function useToast(): IToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('You must use this hooks inside the ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
