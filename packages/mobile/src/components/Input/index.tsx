/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { Text, TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import colors from '../../styles/colors';

import { WrapperInput, InputField, Icon } from './styles';

interface IInputProps extends TextInputProps {
  name: string;
  icon?: string;
}
interface InputValueRef {
  value: string;
}

export interface IInputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<IInputRef, IInputProps> = (
  { name, icon, style, ...rest },
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });
  const inputElementRef = useRef(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlue = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',

      setValue: (_, value) => {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue: () => {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [registerField, fieldName]);

  return (
    <>
      <WrapperInput style={style} isFocused={isFocused} isErrored={!!error}>
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={isFocused || isFilled ? colors.terceary : colors.placeholder}
          />
        )}

        <InputField
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={colors.placeholder}
          onFocus={handleInputFocus}
          onBlur={handleInputBlue}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />

        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </WrapperInput>
    </>
  );
};

export default forwardRef(Input);
