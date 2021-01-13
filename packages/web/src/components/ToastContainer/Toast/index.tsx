import React, { useEffect, useMemo } from 'react';
import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

import { ToastWrapper } from './styles';

import { IToastMessage, useToast } from '../../../hooks/ToastContext';

interface IToastProps {
  message: IToastMessage;
  style: object;
}

const Toast: React.FC<IToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const time = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, [removeToast, message.id]);

  const iconByType = useMemo(
    () => ({
      info: <FiInfo size={24} />,
      success: <FiCheckCircle size={24} />,
      error: <FiXCircle size={24} />,
    }),
    [],
  );

  return (
    <ToastWrapper
      key={message.id}
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {iconByType[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </ToastWrapper>
  );
};

export default Toast;
