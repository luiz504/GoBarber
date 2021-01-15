/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
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
  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });
  const inputElementRef = useRef(null);

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
    <WrapperInput style={style}>
      {icon && <Icon name={icon} size={20} color={colors.placeholder} />}

      <InputField
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor={colors.placeholder}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
      {error && <Text>{error}</Text>}
    </WrapperInput>
  );
};

export default forwardRef(Input);
