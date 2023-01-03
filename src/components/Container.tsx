import React, { memo } from 'react';
import styles from './styles.less';

export interface ContainerProps {
  children?: React.ReactNode;
}

const Container = memo(({ children }: ContainerProps): JSX.Element => <div className={styles.calendar}>{children}</div>);

export default Container;
