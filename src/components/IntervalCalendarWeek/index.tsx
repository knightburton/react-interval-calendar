import React, { useMemo, useContext } from 'react';

import IntervalCalendarDay from '../IntervalCalendarDay';

import { IntervalCalendarWeekProps } from '../../interfaces/IntervalCalendarWeek.interface';
import Context from '../../context';
import {
  addDays,
  addWeeks,
  isMonthEven,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isToday,
  isWeekend,
  formatDate,
} from '../../utils/date';
import styles from './styles.less';

const IntervalCalendarWeek = ({ numberOfWeek }: IntervalCalendarWeekProps) => {
  // useContext hooks
  const { startDate } = useContext(Context);

  // useMemo hooks
  const data = useMemo(() => startDate ? (
    Array.from({ length: 7 }, (_, i) => i).map(day => {
      const date = addWeeks(addDays(startDate, day), numberOfWeek);

      return {
        key: `${numberOfWeek}-${day}`,
        date,
        display: formatDate(date),
        isMonthEven: isMonthEven(date),
        isFirstDayOfMonth: isFirstDayOfMonth(date),
        isLastDayOfMonth: isLastDayOfMonth(date),
        isToday: isToday(date),
        isWeekend: isWeekend(date),
      };
    })
  ) : (
    []
  ), [numberOfWeek, startDate]);

  return (
    <ul key={numberOfWeek} className={styles.week}>
      {data.map(day => (
        <IntervalCalendarDay
          key={day.key}
          day={day}
        />
      ))}
    </ul>
  );
};

export default IntervalCalendarWeek;
