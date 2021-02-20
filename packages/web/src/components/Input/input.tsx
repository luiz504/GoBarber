/* eslint-disable react/jsx-props-no-spreading */
import { useField } from '@unform/core';
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { WrapperInput, InputError } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<IInputProps> = ({ name, icon: Icon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [fieldName, registerField]);

  return (
    <WrapperInput isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      {Icon && <Icon />}

      <input
        ref={inputRef}
        type="text"
        defaultValue={defaultValue}
        {...rest}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
      />

      {error && (
        <InputError title={error}>
          <FiAlertCircle />
        </InputError>
      )}
    </WrapperInput>
  );
};

export default Input;
