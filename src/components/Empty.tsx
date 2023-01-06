import React from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';

interface EmptyProps {
  height: number | '100%' | 'auto';
  emptyLabel: string;
  className?: string;
}

const Empty = ({ height, emptyLabel, className = '' }: EmptyProps): JSX.Element => (
  <div
    className={classnames(styles.empty, className)}
    style={{
      height,
    }}
  >
    <p>{emptyLabel || 'There is no date range to display'}</p>
  </div>
);
export default Empty;
