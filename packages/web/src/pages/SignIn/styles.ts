import styled from 'styled-components';

import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.png';
import colors from '../../styles/colors';

export const WrapperSignIn = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const FormSection = styled.div`
  width: 100%;
  max-width: 700px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    width: 340px;
    margin: 80px 0%;
    text-align: center;

    > h1 {
      margin-bottom: 24px;
    }

    input {
      width: 100%;
      padding: 16px;
      border-radius: 10px;
      border: 2px solid #232129;
      color: ${colors['off-white']};
      background: ${colors.secondary};

      &::placeholder {
        color: ${colors.placeholder};
      }

      & + input {
        margin-top: 8px;
      }
    }

    button {
      height: 56px;
      width: 100%;
      padding: 0 16px;
      margin-top: 16px;
      border-radius: 10px;
      color: ${colors.primary};
      background-color: ${colors.terceary};

      font-weight: 500;
      transition: background-color 150ms ease;

      &:hover {
        background-color: ${shade(0.1, colors.terceary)};
      }
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

    color: ${colors.terceary};
    transition: color 150ms ease;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.1, colors.terceary)};
    }
  }
`;

export const BgImg = styled.div`
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
  flex: 1;
`;
