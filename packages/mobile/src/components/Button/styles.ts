import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const WrapperButton = styled(RectButton)`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: ${colors.terceary};

  justify-content: center;
  align-items: center;
`;

export const BtnText = styled.Text`
  font-family: ${fonts.robotoSlabMedium};
  font-size: 18px;
  color: ${colors.primary};
`;
