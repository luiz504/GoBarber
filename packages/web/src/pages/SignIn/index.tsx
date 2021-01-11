import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input/input';
import Button from '../../components/Button';

import { WrapperSignIn, FormSection, BgImg } from './styles';

const SignIn: React.FC = () => {
  const handleSubmit = useCallback(() => {
    console.log('hello');
  }, []);

  return (
    <WrapperSignIn>
      <FormSection>
        <img src={logo} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
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
