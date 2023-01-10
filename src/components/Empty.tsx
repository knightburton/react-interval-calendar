import React from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';

interface EmptyProps {
  emptyLabel?: string;
  className?: string;
}

const Empty = ({ emptyLabel, className }: EmptyProps): JSX.Element => (
  <div className={classnames(styles.empty, className)}>
    <p>{emptyLabel || 'There is no date range to display'}</p>
  </div>
);
export default Empty;
