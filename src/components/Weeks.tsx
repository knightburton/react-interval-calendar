import React, { memo } from 'react';
import { WeeksHeight } from '../types';
import classnames from '../utils/classnames';
import styles from './styles.less';

interface WeeksProps {
  startDate: Date | null;
  numberOfWeeks: number;
  weeksHeight: WeeksHeight;
  renderWeek: (numberOfWeek: number) => JSX.Element;
  className?: string;
}

const Weeks = memo(
  ({ startDate, numberOfWeeks, weeksHeight, renderWeek, className = '' }: WeeksProps): JSX.Element => (
    <div className={classnames(styles.weeks, className)} style={{ height: weeksHeight }}>
      {!!startDate && Array.from(Array(numberOfWeeks + 1).keys()).map(numberOfWeek => renderWeek(numberOfWeek))}
    </div>
  ),
);

export default Weeks;
