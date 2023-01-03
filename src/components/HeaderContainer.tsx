import React, { memo } from 'react';
import styles from './styles.less';

export interface HeaderContainerProps {
  children?: React.ReactNode;
}

const HeaderContainer = memo(({ children }: HeaderContainerProps): JSX.Element => <div className={styles.header}>{children}</div>);

export default HeaderContainer;
