import React from 'react';
import { BodyCellType } from '../types';
import { getBodyCellContent } from '../helpers';

export interface BodyCellContentProps {
  data: BodyCellType;
  className?: string;
}

export interface BodyCellContentPrivateProps extends BodyCellContentProps {
  locale?: string;
  component?: React.ComponentType<BodyCellContentProps>;
}

const BodyCellContent = ({ data, locale, component: Component, className }: BodyCellContentPrivateProps): JSX.Element => {
  if (Component) return <Component className={className} data={data} />;
  return <span className={className}>{getBodyCellContent(data, locale)}</span>;
};

export default BodyCellContent;
