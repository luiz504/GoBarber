/* eslint-disable react/jsx-props-no-spreading */
import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { WrapperInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
  return (
    <WrapperInput>
      {Icon && <Icon />}
      <input type="text" {...rest} />
    </WrapperInput>
  );
};

export default Input;
