import React, { useMemo, useContext, useState, useCallback } from 'react';

import { IntervalCalendarDayProps } from '../../interfaces/IntervalCalendarDay.interface';
import Context from '../../context';
import classnames from '../../utils/classnames';
import styles from './styles.less';

const IntervalCalendarDay = ({ day }: IntervalCalendarDayProps): JSX.Element => {
  // useContext hooks
  const {
    showToday,
    showMonths,
    showYears,
    showGutterBetweenHighlighted,
    showMonthStripes,
    fadeWeekends,
    handleSelect: contextSelect,
    customClassNames,
  } = useContext<ContextType>(Context);

  // useState hooks
  const [selected, setSelected] = useState(false);

  // useCallback hooks
  const handleSelect = useCallback(() => {
    if (contextSelect && !selected) {
      setSelected(true);
      contextSelect(day, () => setSelected(false));
    }
  }, [contextSelect, selected, day]);

  // useMemo hooks
  const className = useMemo<string>(
    () =>
      classnames(
        styles.day,
        {
          [styles.day__month__even]: showMonthStripes && day.isMonthEven,
          [styles.day__first__of__month__text]: day.isFirstDayOfMonth,
          [styles.day__first__of__month]: showMonthStripes && day.isFirstDayOfMonth,
          [styles.day__first__of__month__even]: showMonthStripes && day.isFirstDayOfMonth && day.isMonthEven,
          [styles.day__last__of__month]: showMonthStripes && day.isLastDayOfMonth,
          [styles.day__last__of__month__even]: showMonthStripes && day.isLastDayOfMonth && day.isMonthEven,
          [styles.day__today]: showToday && day.isToday,
          [styles.day__weekend]: day.isWeekend && fadeWeekends,
          [styles.day__selectable]: !!contextSelect,
          [styles.day__selected]: selected,
          // custom ones
          [`${customClassNames?.dayToday || ''}`]: showToday && day.isToday,
          [`${customClassNames?.daySelected || ''}`]: selected,
        },
        customClassNames?.day,
      ),
    [day, showToday, showMonthStripes, fadeWeekends, contextSelect, selected, customClassNames.day, customClassNames.dayToday, customClassNames.daySelected],
  );
  const highlightedClassName = useMemo<string>(
    () =>
      classnames(
        styles.day__highlighted,
        {
          [styles.day__highlighted__first]: day?.isFirstOfHighlighted,
          [styles.day__highlighted__last]: day?.isLastOfHighlighted,
          [styles.day__highlighted__gutter]: showGutterBetweenHighlighted,
        },
        customClassNames?.dayHighlighted,
      ),
    [day, showGutterBetweenHighlighted, customClassNames.dayHighlighted],
  );
  const monthClassName = useMemo<string>(() => classnames(styles.day__text__detail, customClassNames?.dayMonthText), [customClassNames.dayMonthText]);
  const dayClassName = useMemo<string>(() => classnames(styles.day__text, customClassNames?.dayText), [customClassNames.dayText]);
  const yearClassName = useMemo<string>(() => classnames(styles.day__text__detail, customClassNames?.dayYearText), [customClassNames.dayYearText]);

  return (
    <li className={className} onClick={handleSelect} aria-hidden="true">
      {day?.isHighlighted && (
        <div
          className={highlightedClassName}
          style={{
            backgroundColor: day.highlightColor,
          }}
        />
      )}
      {showMonths && day?.isFirstDayOfMonth && <span className={monthClassName}>{day.monthLabel}</span>}
      <span className={dayClassName}>{day.dayLabel}</span>
      {showYears && day?.isFirstDayOfMonth && <span className={yearClassName}>{day.yearLabel}</span>}
    </li>
  );
};

export default IntervalCalendarDay;
