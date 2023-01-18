import React, { memo, useMemo } from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  height?: number | '100%' | 'auto';
}

export interface ContainerPrivateProps extends ContainerProps {
  component?: React.ComponentType<ContainerProps>;
}

const Container = memo(
  ({ children, component: Component, className, height }: ContainerPrivateProps): JSX.Element => {
    const classes = useMemo(() => classnames(styles.calendar, className), [className]);

    if (Component)
      return (
        <Component className={classes} height={height}>
          {children}
        </Component>
      );
    return (
      <div className={classes} style={{ height }}>
        {children}
      </div>
    );
  },
);

export default Container;
