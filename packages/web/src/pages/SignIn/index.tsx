import React from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { WrapperSignIn, FormSection, BgImg } from './styles';
import logo from '../../assets/logo.svg';

import Input from '../../components/Input/input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  return (
    <WrapperSignIn>
      <FormSection>
        <img src={logo} alt="GoBarber" />

        <form>
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
        </form>

        <Link to="/signup">
          <FiLogIn />
          Create Account
        </Link>
      </FormSection>
      <BgImg />
    </WrapperSignIn>
  );
};

export default SignIn;
