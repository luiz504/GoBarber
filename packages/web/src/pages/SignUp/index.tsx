import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input/input';
import Button from '../../components/Button';

import { WrapperSignUp, FormSection, BgImg } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
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
    } catch (error) {
      const errors = getValidationErrors(error);

      formRef.current?.setErrors(errors);
    }
  }, []);
  return (
    <WrapperSignUp>
      <BgImg />

      <FormSection>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
          <h1> Sign Up</h1>

          <Input
            name="name"
            icon={FiUser}
            placeholder="Name"
            autoComplete="new-password"
          />

          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            autoComplete="new-password"
          />

          <Input
            name="confirmEmail"
            icon={FiMail}
            placeholder="Confirm E-mail"
            autoComplete="new-password"
            onPaste={event => event.preventDefault()}
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            autoComplete="new-password"
            placeholder="Password"
          />

          <Input
            name="confirmPassword"
            icon={FiLock}
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            onPaste={event => event.preventDefault()}
          />

          <Button type="submit"> Join</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Return to Sign In
        </Link>
      </FormSection>
    </WrapperSignUp>
  );
};

export default SignUp;
