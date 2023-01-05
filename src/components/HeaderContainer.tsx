import React, { memo, useMemo } from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';

export interface HeaderContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export interface HeaderContainerPrivateProps extends HeaderContainerProps {
  component?: React.ComponentType<HeaderContainerProps>;
}

const HeaderContainer = memo(
  ({ children, component: Component, className = '' }: HeaderContainerPrivateProps): JSX.Element => {
    const classes = useMemo(() => classnames(styles.header, className), [className]);

    if (Component) return <Component className={classes}>{children}</Component>;
    return <div className={styles.classes}>{children}</div>;
  },
);

export default HeaderContainer;
