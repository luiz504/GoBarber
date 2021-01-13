import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

import signUpBackground from '../../assets/sign-up-background.png';
import colors from '../../styles/colors';

export const WrapperSignUp = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const FormSection = styled.div`
  width: 100%;
  max-width: 700px;

  display: flex;
  justify-content: center;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  } to  {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimatedFormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 500ms ease-in-out;

  form {
    width: 340px;
    margin: 80px 0%;
    text-align: center;

    > h1 {
      margin-bottom: 24px;
    }

    a {
      margin-top: 24px;

      color: ${colors['off-white']};
      transition: color 150ms ease;

      display: block;

      &:hover {
        color: ${shade(0.1, colors['off-white'])};
      }
    }
  }

  > a {
    margin-top: 24px;

    color: ${colors[`off-white`]};
    transition: color 150ms ease;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.1, colors['off-white'])};
    }
  }
`;

export const BgImg = styled.div`
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
  flex: 1;
`;
