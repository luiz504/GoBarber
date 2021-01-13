/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextInputProps } from 'react-native';

import colors from '../../styles/colors';

import { WrapperInput, InputField, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}

const Input: React.FC<InputProps> = ({ icon, style, ...rest }) => {
  return (
    <WrapperInput style={style}>
      {icon && <Icon name={icon} size={20} color={colors.placeholder} />}

      <InputField
        keyboardAppearance="dark"
        placeholderTextColor={colors.placeholder}
        {...rest}
      />
    </WrapperInput>
  );
};

export default Input;
