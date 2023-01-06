import React, { memo, useMemo } from 'react';
import { HeaderCellType } from '../types';
import classnames from '../utils/classnames';
import styles from './styles.less';

export interface HeaderCellContentProps {
  data: HeaderCellType;
  className?: string;
}

export interface HeaderCellContentPrivateProps extends HeaderCellContentProps {
  component?: React.ComponentType<HeaderCellContentProps>;
}

const HeaderCellContent = memo(
  ({ data, component: Component, className = '' }: HeaderCellContentPrivateProps): JSX.Element => {
    const classes = useMemo(() => classnames(styles.header__cell__content, className), [className]);

    if (Component) return <Component data={data} className={classes} />;
    return <span className={classes}>{data.short}</span>;
  },
);

export default HeaderCellContent;
