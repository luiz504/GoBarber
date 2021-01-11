import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input/input';
import Button from '../../components/Button';

import { WrapperSignUp, FormSection, BgImg } from './styles';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        confirmemail: Yup.string().email().required(),
        password: Yup.string().min(6),
        confirmPassword: Yup.string()
          .min(6)
          .required('You must confirm your password'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      console.log(`err`, error);//eslint-disable-line
    }
  }, []);
  return (
    <WrapperSignUp>
      <BgImg />

      <FormSection>
        <img src={logo} alt="GoBarber" />

        <Form onSubmit={handleSubmit} autoComplete="off">
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
