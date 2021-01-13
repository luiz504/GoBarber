import React from 'react';

import { useTransition } from 'react-spring';
import Toast from './Toast';

import { ToastContainerWrapper } from './styles';

import { IToastMessage } from '../../hooks/ToastContext';

interface IToastContainerProps {
  messages: IToastMessage[];
}

const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <ToastContainerWrapper>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </ToastContainerWrapper>
  );
};

export default ToastContainer;
