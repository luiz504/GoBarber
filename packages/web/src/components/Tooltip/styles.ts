import styled from 'styled-components';
import colors from '../../styles/colors';

export const WrapperTooltip = styled.div`
  height: 20px;
  margin-left: 16px;
  position: relative;

  > svg {
    color: ${colors.danger};
    font-size: 20px;
  }

  span {
    width: 160px;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    background: ${colors.terceary};
    color: ${colors.primary};
    z-index: 100;

    &::before {
      content: '';
      border-style: solid;
      border-color: ${colors.terceary} transparent;
      border-width: 0px 6px 6px 6px;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
