import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/logo.png';
import colors from '../../styles/colors';

import {
  WrapperSignIn,
  Title,
  InputField,
  BtnSubmit,
  BtnForgotPw,
  TextForgotPw,
  BtnSignUp,
  TextSignUp,
} from './styles';

const SignIn: React.FC = () => {
  const [isOpenKeyboad, setIsOpenKeyboad] = useState(false);

  const handleKeyboard = useCallback((value: boolean) => {
    setIsOpenKeyboad(value);
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => handleKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => handleKeyboard(false));

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => handleKeyboard(false));
      Keyboard.removeListener('keyboardDidHide', () => handleKeyboard(false));
    };
  }, [handleKeyboard]);
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <WrapperSignIn>
            <Image source={logo} />
            <View>
              <Title> SignIn </Title>
            </View>

            <InputField name="mail" icon="mail" placeholder="E-mail" />
            <InputField name="password" icon="lock" placeholder="Password" />

            <BtnSubmit
              onPress={() => {
                console.log(`join`); //eslint-disable-line
              }}
            >
              Join
            </BtnSubmit>

            <BtnForgotPw
              onPress={() => {
                console.log(`forgot`); //eslint-disable-line
              }}
            >
              <TextForgotPw> Forgot Password</TextForgotPw>
            </BtnForgotPw>
          </WrapperSignIn>
        </ScrollView>
      </KeyboardAvoidingView>
      {!isOpenKeyboad && (
        <BtnSignUp>
          <Icon name="log-in" size={20} color={colors.terceary} />
          <TextSignUp>Sign Up</TextSignUp>
        </BtnSignUp>
      )}
    </>
  );
};

export default SignIn;
