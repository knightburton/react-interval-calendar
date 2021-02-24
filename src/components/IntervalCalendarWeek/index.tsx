import React, { useMemo, useContext } from 'react';

import IntervalCalendarDay from '../IntervalCalendarDay';

import { IntervalCalendarWeekProps } from '../../interfaces/IntervalCalendarWeek.interface';
import Context from '../../context';
import { getDayAttributes } from '../../helpers';
import styles from './styles.less';

const IntervalCalendarWeek = ({ numberOfWeek }: IntervalCalendarWeekProps): JSX.Element => {
  // useContext hooks
  const { startDate, highlighted, locale } = useContext(Context);

  // useMemo hooks
  const data = useMemo(() => {
    if (!startDate) return [];
    return Array.from(Array(7).keys()).map(day => getDayAttributes(startDate, numberOfWeek, day, highlighted, locale));
  }, [startDate, numberOfWeek, highlighted, locale]);

  return (
    <ul key={numberOfWeek} className={styles.week}>
      {data.map(day => (
        <IntervalCalendarDay key={day.key} day={day} />
      ))}
    </ul>
  );
};

export default IntervalCalendarWeek;
