import React, { useMemo } from 'react';
import BodyCellContent, { BodyCellContentProps } from './BodyCellContent';
import { BodyCellType } from '../types';
import styles from './styles.less';
import classnames from '../utils/classnames';

export interface BodyCellProps {
  data: BodyCellType;
  locale?: string;
  onClick?: (data: BodyCellType) => void;
  contentComponent?: React.ComponentType<BodyCellContentProps>;
  className?: string;
  contentClassName?: string;
}

const BodyCell = ({ data, locale, contentComponent: ContentComponent, onClick, className, contentClassName }: BodyCellProps): JSX.Element => {
  const classes = useMemo(() => classnames(styles.body__cell, className), [className]);

  return (
    <li className={classes} onClick={(!!onClick && onClick(data)) || undefined} role="presentation">
      <BodyCellContent data={data} locale={locale} component={ContentComponent} className={contentClassName} />
    </li>
  );
};

export default BodyCell;
