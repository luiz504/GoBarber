import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

import colors from '../../../styles/colors';

interface IToast {
  type?: 'info' | 'success' | 'error';
  hasdescript: boolean | number;
}

const toastTypeVariations = {
  info: css`
    color: ${colors.info};
    background: ${colors.infobg};
  `,
  success: css`
    color: ${colors.success};
    background: ${colors.successbg};
  `,
  error: css`
    color: ${colors.danger};
    background: ${colors.dangerbg};
  `,
};

// eslint-disable-next-line prettier/prettier
export const ToastWrapper = styled(animated.div)<IToast>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  ${props => toastTypeVariations[props.type || 'info']}

  ${props =>
    !props.hasdescript &&
    css`
      align-items: center;
      > svg {
        margin-top: 0;
      }
    `}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  & + div {
    margin-top: 8px;
  }
`;
