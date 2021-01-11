/* eslint-disable react/jsx-props-no-spreading */
import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { IconBaseProps } from 'react-icons';

import { WrapperInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [fieldName, registerField]);

  return (
    <WrapperInput>
      {Icon && <Icon />}

      <input ref={inputRef} type="text" defaultValue={defaultValue} {...rest} />
    </WrapperInput>
  );
};

export default Input;
