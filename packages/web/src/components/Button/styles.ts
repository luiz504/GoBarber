import { shade } from 'polished';
import styled from 'styled-components';
import colors from '../../styles/colors';

export const WrapperButton = styled.button`
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
`;
