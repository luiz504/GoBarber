import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

interface WrapperInputProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const WrapperInput = styled.div<WrapperInputProps>`
  width: 100%;
  padding: 16px;
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
    flex: 1;
    border: 0;
    background: transparent;
    color: ${colors['off-white']};

    &::placeholder {
      color: ${colors.placeholder};
    }
  }

  svg {
    margin-right: 16px;
  }
`;
