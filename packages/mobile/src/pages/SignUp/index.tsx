import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

import logo from '../../assets/logo.png';
import colors from '../../styles/colors';
import { IInputRef } from '../../components/Input';

import {
  WrapperSignUp,
  Title,
  InputField,
  BtnSubmit,
  BtnSignIn,
  TextSignIn,
} from './styles';

import useKeyboadUtils from '../../hooks/keyboad';
import getValidationErrors from '../../utils/getValidationErrors';

interface IFormData {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const { isOpenKeyboard } = useKeyboadUtils();
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<IInputRef>(null);
  const confirmEmailInputRef = useRef<IInputRef>(null);
  const pwInputRef = useRef<IInputRef>(null);
  const confirmPwInputRef = useRef<IInputRef>(null);

  const handleSubmit = useCallback(async (data: IFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email('You must provide a valid E-mail.')
          .required('E-mail is required.'),
        confirmEmail: Yup.string()
          .email('You must provide a valid E-mail.')
          .required('Confirm E-mail is required.')
          .oneOf([Yup.ref('email')], 'E-mails must be the same.'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters.')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
            'Password must be at leat 6 characters, one uppercase, one lowercase and one number',
          ),
        confirmPassword: Yup.string()
          .required('You must confirm your password.')
          .oneOf([Yup.ref('password')], 'Passwords must be the same.'),
      });

      await schema.validate(data, { abortEarly: false });

      // await api.post('/users', {
      //   name: data.name,
      //   email: data.email,
      //   password: data.password,
      // });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Unespected Error',
        'Something went wrong :( try again later.',
      );
    }
  }, []);

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
          <WrapperSignUp>
            <Image source={logo} />
            <View>
              <Title> Sign Up </Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <InputField
                name="name"
                icon="user"
                placeholder="Name"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current.focus();
                }}
              />

              <InputField
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmEmailInputRef.current.focus();
                }}
              />

              <InputField
                ref={confirmEmailInputRef}
                name="confirmEmail"
                icon="mail"
                placeholder="Confirm E-email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                contextMenuHidden
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
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPwInputRef.current.focus();
                }}
              />

              <InputField
                ref={confirmPwInputRef}
                name="confirmPassword"
                icon="lock"
                placeholder="Confirm Password"
                secureTextEntry
                textContentType="newPassword"
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
          </WrapperSignUp>
        </ScrollView>
      </KeyboardAvoidingView>

      {!isOpenKeyboard && (
        <BtnSignIn onPress={() => navigation.navigate('SignIn')}>
          <Icon name="arrow-left" size={20} color={colors['off-white']} />
          <TextSignIn>Sign In</TextSignIn>
        </BtnSignIn>
      )}
    </>
  );
};

export default SignUp;
