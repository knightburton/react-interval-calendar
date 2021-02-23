import React, { useMemo, useContext } from 'react';

import IntervalCalendarDay from '../IntervalCalendarDay';

import { IntervalCalendarWeekProps } from '../../interfaces/IntervalCalendarWeek.interface';
import Context from '../../context';
import { getDayAttributes } from '../../helpers';
import styles from './styles.less';

const IntervalCalendarWeek = ({ numberOfWeek }: IntervalCalendarWeekProps) => {
  // useContext hooks
  const { startDate, highlighted, locale } = useContext(Context);

  // useMemo hooks
  const data = useMemo(
    () => startDate
      ? Array.from(Array(7).keys()).map(day => getDayAttributes(startDate, numberOfWeek, day, highlighted, locale))
      : [],
    [numberOfWeek, startDate],
  );

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
