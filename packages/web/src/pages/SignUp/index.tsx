import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input/input';
import Button from '../../components/Button';

import { WrapperSignUp, FormSection, BgImg } from './styles';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback((data: object) => {
    console.log('hello', data);
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
            name="email"
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
            name="confirm-password"
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
