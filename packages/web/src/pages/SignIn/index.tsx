import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input/input';
import Button from '../../components/Button';

import { WrapperSignIn, FormSection, BgImg } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuthContenxt } from '../../context/AuthContext';

interface IFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuthContenxt();

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

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return (
    <WrapperSignIn>
      <FormSection>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1> Sign In</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />

          <Button type="submit"> Join</Button>

          <Link to="/forgot"> Forgot password</Link>
        </Form>

        <Link to="/sign-up">
          <FiLogIn />
          Create Account
        </Link>
      </FormSection>
      <BgImg />
    </WrapperSignIn>
  );
};

export default SignIn;
