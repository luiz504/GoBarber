import React from 'react';

import { WrapperTooltip } from './styles';

interface ITooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<ITooltipProps> = ({ title, children, className }) => {
  return (
    <WrapperTooltip className={className}>
      {children}
      <span>{title}</span>
    </WrapperTooltip>
  );
};

export default Tooltip;
