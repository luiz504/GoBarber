import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastWrapper, Toast } from './styles';

import { IToastMessage } from '../../hooks/ToastContext';

interface IToastContainerProps {
  messages: IToastMessage[];
}

const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {
  return (
    <ToastWrapper>
      {messages.map(message => (
        <Toast hasDescription={!!message.description} key={message.id}>
          <FiAlertCircle size={20} />
          <div>
            <strong>{message.title}</strong>
            {message.description && <p>{message.description}</p>}
          </div>

          <button type="button">
            <FiXCircle size={18} />
          </button>
        </Toast>
      ))}
    </ToastWrapper>
  );
};

export default ToastContainer;
