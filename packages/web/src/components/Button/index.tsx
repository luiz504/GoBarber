/* eslint-disable react/jsx-props-no-spreading */
import React, { ButtonHTMLAttributes } from 'react';

import { WrapperButton } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <WrapperButton type="button" {...rest}>
      {children}
    </WrapperButton>
  );
};

export default Button;
