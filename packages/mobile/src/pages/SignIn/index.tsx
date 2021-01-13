import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/logo.png';
import useKeyboadUtils from '../../hooks/keyboad';
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
  const { isOpenKeyboard } = useKeyboadUtils();
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ minHeight: '100%' }}
        >
          <WrapperSignIn>
            <Image source={logo} />
            <View>
              <Title> Sign In </Title>
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

      {!isOpenKeyboard && (
        <BtnSignUp onPress={() => navigation.navigate('SignUp')}>
          <Icon name="log-in" size={20} color={colors.terceary} />
          <TextSignUp>Sign Up</TextSignUp>
        </BtnSignUp>
      )}
    </>
  );
};

export default SignIn;
