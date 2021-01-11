import React from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { WrapperSignUp, FormSection, BgImg } from './styles';
import logo from '../../assets/logo.svg';

import Input from '../../components/Input/input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  return (
    <WrapperSignUp>
      <BgImg />

      <FormSection>
        <img src={logo} alt="GoBarber" />

        <form>
          <h1> Sign Up</h1>
          <Input
            name="name"
            icon={FiUser}
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
        </form>

        <Link to="/">
          <FiArrowLeft />
          Return to Sign In
        </Link>
      </FormSection>
    </WrapperSignUp>
  );
};

export default SignUp;
