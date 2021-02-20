import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

import Tooltip from '../Tooltip';

interface IWrapperInputProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const WrapperInput = styled.div<IWrapperInputProps>`
  width: 100%;
  padding-left: 16px;
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid #232129;
  color: ${colors.placeholder};

  background: ${colors.secondary};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${colors.danger};
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${colors.terceary};
      border-color: ${colors.terceary};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${colors.terceary};
    `}



  input {
    min-height: 57px;
    padding-right: 16px;
    flex: 1;
    border: 0;
    background: transparent;
    color: ${colors['off-white']};

    &::placeholder {
      color: ${colors.placeholder};
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: ${colors.terceary};
    -webkit-box-shadow: 0 0 0px 1000px ${colors.secondary} inset;
    box-shadow: 0 0 0px 1000px ${colors.secondary} inset;
    transition: background-color 5000s ease-in-out 0s;
    font-size: inherit;
  }

  > svg {
    margin-right: 16px;
  }
`;

export const InputError = styled(Tooltip)`
  span {
    background: ${colors.danger};
    color: ${colors.white};

    &::before {
      border-color: ${colors.danger} transparent;
    }
  }
`;
