import React, { useMemo } from 'react';
import { BodyCellType } from '../types';
import { getBodyCellContent } from '../helpers';
import classnames from '../utils/classnames';
import styles from './styles.less';

export interface BodyCellContentProps {
  data: BodyCellType;
  className?: string;
}

export interface BodyCellContentPrivateProps extends BodyCellContentProps {
  locale?: string;
  component?: React.ComponentType<BodyCellContentProps>;
}

const BodyCellContent = ({ data, locale, component: Component, className }: BodyCellContentPrivateProps): JSX.Element => {
  const classes = useMemo(() => classnames(styles.body__cell__content, className), [className]);

  if (Component) return <Component className={classes} data={data} />;
  return <span className={classes}>{getBodyCellContent(data, locale)}</span>;
};

export default BodyCellContent;
