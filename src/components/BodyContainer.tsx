import React from 'react';
import styles from './styles.less';

export interface BodyContainerProps {
  children?: React.ReactNode;
}

const BodyContainer = ({ children }: BodyContainerProps): JSX.Element => <div className={styles.body}>{children}</div>;

export default BodyContainer;
