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
  WrapperSignUp,
  Title,
  InputField,
  BtnSubmit,
  BtnSignIn,
  TextSignIn,
} from './styles';

const SignUp: React.FC = () => {
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
          <WrapperSignUp>
            <Image source={logo} />
            <View>
              <Title> Sign Up </Title>
            </View>

            <InputField name="name" icon="user" placeholder="Name" />

            <InputField name="mail" icon="mail" placeholder="E-mail" />

            <InputField
              name="confirmEmail"
              icon="mail"
              placeholder="Confirm E-email"
            />

            <InputField name="password" icon="lock" placeholder="Password" />

            <InputField
              name="confirmPassword"
              icon="lock"
              placeholder="Confirm Password"
            />

            <BtnSubmit
              onPress={() => {
                console.log(`join`); //eslint-disable-line
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
