import React, { useContext, useMemo } from 'react';

import Context from '../../context';
import { generateHeaderWeekdays } from '../../helpers';
import styles from './styles.less';

const IntervalCalendarHeader = () => {
  // useContext hooks
  const { showWeekdays, weekStartsOn } = useContext(Context);

  // useMemo hooks
  const weekdays = useMemo<HeaderWeekday[]>(
    () => showWeekdays
      ? generateHeaderWeekdays(weekStartsOn)
      : [],
    [weekStartsOn, showWeekdays],
  );

  return (
    <div className={styles.header}>
      {showWeekdays && weekdays.map(weekday => (
        <div key={weekday.key} className={styles.header__day}>
          {weekday.label}
        </div>
      ))}
    </div>
  );
};

export default IntervalCalendarHeader;
