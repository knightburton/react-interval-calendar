import React, { memo } from 'react';
import { WeeksHeight } from '../types';
import classnames from '../utils/classnames';
import styles from './styles.less';

interface EmptyProps {
  weeksHeight: WeeksHeight;
  emptyLabel: string;
  className?: string;
}

const Empty = memo(
  ({ weeksHeight, emptyLabel, className = '' }: EmptyProps): JSX.Element => (
    <div
      className={classnames(styles.empty, className)}
      style={{
        height: weeksHeight,
      }}
    >
      <p>{emptyLabel || 'There is no date range to display'}</p>
    </div>
  ),
);

export default Empty;
