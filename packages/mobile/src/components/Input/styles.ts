import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const WrapperInput = styled.View`
  height: 60px;
  width: 100%;
  padding: 0 16px;
  border-radius: 10px;
  background: ${colors.secondary};

  flex-direction: row;
  align-items: center;
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
