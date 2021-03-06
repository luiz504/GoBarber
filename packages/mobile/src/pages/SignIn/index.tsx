import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Alert,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.png';
import colors from '../../styles/colors';
import { IInputRef } from '../../components/Input';

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

import useKeyboadUtils from '../../hooks/keyboad';
import { useAuth } from '../../hooks/AuthContext';

interface IFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { isOpenKeyboard } = useKeyboadUtils();
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const pwInputRef = useRef<IInputRef>(null);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('You must provide a valid E-mail.')
            .required('E-mail is required.'),
          password: Yup.string().required('Password is required.'),
        });

        await schema.validate(data, { abortEarly: false });
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert('Unespected Error', 'Check your data or try again later.');
      }
    },
    [signIn],
  );

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

            <Form ref={formRef} onSubmit={handleSubmit}>
              <InputField
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  pwInputRef.current.focus();
                }}
              />

              <InputField
                ref={pwInputRef}
                name="password"
                icon="lock"
                placeholder="Password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            <BtnSubmit
              onPress={() => {
                formRef.current?.submitForm();
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
