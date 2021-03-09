import React, { useContext, useMemo, useRef, useState, useEffect } from 'react';

import Context from '../../context';
import { getDayAttributes } from '../../helpers';
import useOnScreen from '../../hooks/useOnScreen';
import { IntervalCalendarWeekProps } from '../../interfaces/IntervalCalendarWeek.interface';
import IntervalCalendarDay from '../IntervalCalendarDay';
import styles from './styles.less';

const DEFAULT_RENDER_TRESHOLD = 8;

const IntervalCalendarWeek = ({ numberOfWeek }: IntervalCalendarWeekProps): JSX.Element => {
  // Hooks
  const { startDate, highlighted, locale } = useContext(Context);
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  const [rendered, setRendered] = useState(numberOfWeek <= DEFAULT_RENDER_TRESHOLD);
  const data = useMemo(() => {
    if (!startDate || !rendered) return [];
    return Array.from(Array(7).keys()).map(day => getDayAttributes(startDate, numberOfWeek, day, highlighted, locale));
  }, [rendered, startDate, numberOfWeek, highlighted, locale]);
  useEffect(() => {
    if (isVisible && !rendered) setRendered(true);
  }, [isVisible, rendered]);

  return (
    <ul ref={ref} key={numberOfWeek} className={styles.week}>
      {data.map(day => (
        <IntervalCalendarDay key={day.key} day={day} />
      ))}
    </ul>
  );
};

export default IntervalCalendarWeek;
