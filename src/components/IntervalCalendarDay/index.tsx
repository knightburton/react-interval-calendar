import React, { useMemo, useContext, useState, useCallback } from 'react';

import { IntervalCalendarDayProps } from '../../interfaces/IntervalCalendarDay.interface';
import Context from '../../context';
import classnames from '../../utils/classnames';
import styles from './styles.less';

const IntervalCalendarDay = ({ day }: IntervalCalendarDayProps) => {
  // useContext hooks
  const {
    showMonths,
    showYears,
    fadeWeekends,
    handleSelect: contextSelect,
  } = useContext<ContextType>(Context);

  // useState hooks
  const [selected, setSelected] = useState(false);

  // useCallback hooks
  const handleSelect = useCallback(() => {
    setSelected(true)
    contextSelect(() => setSelected(false));
  }, [contextSelect]);

  // useMemo hooks
  const className = useMemo<string>(
    () => classnames(
      styles.day,
      {
        [styles.day__month__even]: day.isMonthEven,
        [styles.day__first__of__month]: day.isFirstDayOfMonth,
        [styles.day__first__of__month__even]: day.isFirstDayOfMonth && day.isMonthEven,
        [styles.day__last__of__month]: day.isLastDayOfMonth,
        [styles.day__last__of__month__even]: day.isLastDayOfMonth && day.isMonthEven,
        [styles.day__today]: day.isToday,
        [styles.day__weekend]: day.isWeekend && fadeWeekends,
        [styles.day__selected]: selected,
      },
    ),
    [day, selected],
  );

  const highlightedClassName = useMemo<string>(
    () => classnames(
      styles.day__highlighted,
      {
        [styles.day__highlighted__first]: day?.isFirstOfHighlighted,
        [styles.day__highlighted__last]: day?.isLastOfHighlighted,
      },
    ),
    [day],
  );

  return (
    <li className={className} onClick={handleSelect}>
      {day?.isHighlighted && (
        <div
          className={highlightedClassName}
          style={{
            backgroundColor: day.highlightColor
          }}
        />
      )}
      {showMonths && day?.isFirstDayOfMonth && (
        <span className={styles.day__text__detail}>
          {day.monthLabel}
        </span>
      )}
      <span className={styles.day__text}>
        {day.dayLabel}
      </span>
      {showYears && day?.isFirstDayOfMonth && (
        <span className={styles.day__text__detail}>
          {day.yearLabel}
        </span>
      )}
    </li>
  );
};

export default IntervalCalendarDay;
