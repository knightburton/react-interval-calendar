import React, { useContext, useMemo, useRef, useEffect } from 'react';

import Context from '../../context';
import { getDayAttributes } from '../../helpers';
import useOnScreen from '../../hooks/useOnScreen';
import { IntervalCalendarWeekProps } from '../../interfaces/IntervalCalendarWeek.interface';
import IntervalCalendarDay from '../IntervalCalendarDay';
import styles from './styles.less';

const IntervalCalendarWeek = ({ numberOfWeek }: IntervalCalendarWeekProps): JSX.Element => {
  // General hooks
  const { startDate, highlighted, locale, visibilityMatrix, updateVisibilityMatrix, numberOfWeekPreRender } = useContext(Context);
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  // useMemo hooks
  const shouldRender = useMemo(
    () =>
      Array(numberOfWeekPreRender)
        .fill(null)
        .some((_, idx) => visibilityMatrix[numberOfWeek - idx]),
    [visibilityMatrix, numberOfWeek, numberOfWeekPreRender],
  );

  const data = useMemo(() => {
    if (!startDate || !shouldRender) return [];
    return Array.from(Array(7).keys()).map(day => getDayAttributes(startDate, numberOfWeek, day, highlighted, locale));
  }, [startDate, numberOfWeek, highlighted, locale, shouldRender]);

  // useEffect hooks
  useEffect(() => {
    if (isVisible && !shouldRender) updateVisibilityMatrix(numberOfWeek);
  }, [isVisible, shouldRender, updateVisibilityMatrix, numberOfWeek]);

  return (
    <ul ref={ref} key={numberOfWeek} className={styles.week}>
      {data.map(day => (
        <IntervalCalendarDay key={day.key} day={day} />
      ))}
    </ul>
  );
};

export default IntervalCalendarWeek;
