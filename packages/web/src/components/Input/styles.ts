import styled from 'styled-components';
import colors from '../../styles/colors';

export const WrapperInput = styled.div`
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
