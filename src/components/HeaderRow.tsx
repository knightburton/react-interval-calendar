import React, { memo } from 'react';
import styles from './styles.less';

export interface HeaderRowProps {
  children?: React.ReactNode;
}

const HeaderRow = memo(({ children }: HeaderRowProps): JSX.Element => <ul className={styles.header__row}>{children}</ul>);

export default HeaderRow;
