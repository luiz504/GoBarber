import React from 'react';

import { WrapperTooltip } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children, className }) => {
  return (
    <WrapperTooltip className={className}>
      {children}
      <span>{title}</span>
    </WrapperTooltip>
  );
};

export default Tooltip;
