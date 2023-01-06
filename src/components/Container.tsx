import React, { memo, useMemo } from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ContainerPrivateProps extends ContainerProps {
  component?: React.FC<ContainerProps>;
}

const Container = memo(
  ({ children, component: Component, className = '' }: ContainerPrivateProps): JSX.Element => {
    const classes = useMemo(() => classnames(styles.calendar, className), [className]);

    if (Component) return <Component className={classes}>{children}</Component>;
    return <div className={classes}>{children}</div>;
  },
);

export default Container;
