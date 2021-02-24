import React, { useContext, useMemo } from 'react';

import Context from '../../context';
import { getHeaderWeekdays } from '../../helpers';
import styles from './styles.less';

const IntervalCalendarHeader = (): JSX.Element => {
  // useContext hooks
  const { showWeekdays, weekStartsOn, locale } = useContext(Context);

  // useMemo hooks
  const weekdays = useMemo<HeaderWeekday[]>(() => (showWeekdays ? getHeaderWeekdays(weekStartsOn, locale) : []), [showWeekdays, weekStartsOn, locale]);

  return (
    <div className={styles.header}>
      {showWeekdays &&
        weekdays.map(weekday => (
          <div key={weekday.key} className={styles.header__day}>
            {weekday.label}
          </div>
        ))}
    </div>
  );
};

export default IntervalCalendarHeader;
