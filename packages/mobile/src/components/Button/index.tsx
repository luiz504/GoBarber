/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { WrapperButton, BtnText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  style?: object;
}

const Button: React.FC<ButtonProps> = ({ children, style, ...rest }) => {
  return (
    <WrapperButton style={style} {...rest}>
      <BtnText>{children}</BtnText>
    </WrapperButton>
  );
};

export default Button;
