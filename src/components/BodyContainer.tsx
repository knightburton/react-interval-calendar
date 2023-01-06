import React, { useMemo } from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';

export interface BodyContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export interface BodyContainerPrivateProps extends BodyContainerProps {
  component?: React.FC<BodyContainerProps>;
}

const BodyContainer = ({ children, component: Component, className }: BodyContainerPrivateProps): JSX.Element => {
  const classes = useMemo(() => classnames(styles.body, className), [className]);

  if (Component) return <Component className={classes}>{children}</Component>;
  return <div className={classes}>{children}</div>;
};

export default BodyContainer;
