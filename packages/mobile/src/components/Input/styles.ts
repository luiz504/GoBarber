import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface IWrapperInputProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const WrapperInput = styled.View<IWrapperInputProps>`
  height: 60px;
  width: 100%;
  padding: 0 16px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${colors.secondary};
  background: ${colors.secondary};

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${colors.danger};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.terceary};
    `}
`;

export const InputField = styled.TextInput`
  flex: 1;
  color: ${colors.white};
  font-size: 16px;
  font-family: ${fonts.robotoSlabRegular};
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
