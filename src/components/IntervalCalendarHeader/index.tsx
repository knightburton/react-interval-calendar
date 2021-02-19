import React, { useContext } from 'react';

import Context from '../../context';

import { WEEKDAYS } from '../../constants';

import styles from './styles.less';

const IntervalCalendarHeader = () => {
  const { showWeekdays, weekStartsOn } = useContext(Context);

  return (
    <div className={styles.header}>
      {showWeekdays && [...WEEKDAYS.slice(weekStartsOn, 7), ...WEEKDAYS.slice(0, weekStartsOn)].map(day => (
        <div key={day.key} className={styles.header__day}>
          {day.short}
        </div>
      ))}
    </div>
  );
};

export default IntervalCalendarHeader;
