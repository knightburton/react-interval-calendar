import React, { memo } from 'react';
import { HeaderCell as HeaderCellType } from '../types';
import classnames from '../utils/classnames';
import styles from './styles.less';

export interface HeaderCellProps {
  data: HeaderCellType;
}

const HeaderCell = memo(({ data }: HeaderCellProps): JSX.Element => <li className={classnames(styles.header__cell)}>{data.label}</li>);

export default HeaderCell;
