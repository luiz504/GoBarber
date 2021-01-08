import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { WrapperSignIn, FormSection, BgImg } from './styles';
import logo from '../../assets/logo.svg';

const SignIn: React.FC = () => {
  return (
    <WrapperSignIn>
      <FormSection>
        <img src={logo} alt="GoBarber" />

        <form>
          <h1> Sign In</h1>
          <input placeholder="E-mail" />
          <input type="password" placeholder="Password" />

          <button type="submit"> Join</button>

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
