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
        email: Yup.string().email().required(),
        confirmEmail: Yup.string().email().required(),
        password: Yup.string().min(6),
        confirmPassword: Yup.string()
          .min(6)
          .required('You must confirm your password'),
      });

      await schema.validate(data, { abortEarly: false });

      formRef.current?.setErrors({
        name: 'naomm',
      });
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
