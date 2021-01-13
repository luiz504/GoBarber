import React from 'react';
import { Image } from 'react-native';

import logo from '../../assets/logo.png';

import { WrapperSignIn, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <WrapperSignIn>
      <Image source={logo} />
      <Title> SignIn </Title>
    </WrapperSignIn>
  );
};

export default SignIn;
