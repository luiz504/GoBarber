import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const WrapperSignUp = styled.View`
  flex: 1;
  padding: 0 30px ${Platform.OS === 'android' ? 140 : 40}px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin: 64px 0 24px;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';

  color: ${colors['off-white']};
`;

export const InputField = styled(Input)`
  margin-bottom: 8px;
`;

export const BtnSubmit = styled(Button)`
  margin-top: 8px;
`;

export const BtnSignIn = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px 0;
  border-top-width: 1px;
  border-color: ${colors.secondary};
  margin-bottom: ${getBottomSpace()}px;

  background: ${colors.primary};

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const TextSignIn = styled.Text`
  color: ${colors['off-white']};
  font-size: 18px;
  font-family: ${fonts.robotoSlabRegular};
  margin-left: 16px;
`;
