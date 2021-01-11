import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastWrapper, Toast } from './styles';

const ToastContainer: React.FC = () => {
  return (
    <ToastWrapper>
      <Toast hasDescription>
        <FiAlertCircle size={20} />
        <div>
          <strong>Error!</strong>
          <p>
            SignIn Failure again try afaon bitch qwjodjoqjwo doqwojdojqow
            djqwodjoqwjdoq joqjwodjqwodjoq wd
          </p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast type="success" hasDescription={false}>
        <FiAlertCircle size={20} />
        <div>
          <strong>Error!</strong>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast type="error" hasDescription>
        <FiAlertCircle size={20} />
        <div>
          <strong>Error!</strong>
          <p>
            SignIn Failure again try afaon bitch qwjodjoqjwo doqwojdojqow
            djqwodjoqwjdoq joqjwodjqwodjoq wd
          </p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>
    </ToastWrapper>
  );
};

export default ToastContainer;
