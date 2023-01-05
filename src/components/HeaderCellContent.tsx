import React, { memo } from 'react';
import { HeaderCellType } from '../types';

export interface HeaderCellContentProps {
  data: HeaderCellType;
  className?: string;
}

export interface HeaderCellContentPrivateProps extends HeaderCellContentProps {
  component?: React.ComponentType<HeaderCellContentProps>;
}

const HeaderCellContent = memo(
  ({ data, component: Component, className = '' }: HeaderCellContentPrivateProps): JSX.Element => {
    if (Component) return <Component data={data} className={className} />;
    return <span>{data.short}</span>;
  },
);

export default HeaderCellContent;
