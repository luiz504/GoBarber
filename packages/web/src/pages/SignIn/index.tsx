import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input/input';
import Button from '../../components/Button';

import {
  WrapperSignIn,
  FormSection,
  AnimatedFormSection,
  BgImg,
} from './styles';

import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

interface IFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

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

        addToast({
          type: 'error',
          title: 'Unespected Error',
          description: 'Check your data or try again late',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <WrapperSignIn>
      <FormSection>
        <AnimatedFormSection>
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
        </AnimatedFormSection>
      </FormSection>
      <BgImg />
    </WrapperSignIn>
  );
};

export default SignIn;
