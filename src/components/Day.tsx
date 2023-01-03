import React, { memo, useMemo, useState, useCallback } from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';

export interface DayInterface {
  key: string;
  date: Date;
  yearLabel: number;
  monthLabel: string;
  dayLabel: string;
  isMonthEven: boolean;
  isFirstDayOfMonth: boolean;
  isLastDayOfMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isHighlighted: boolean;
  isFirstOfHighlighted: boolean;
  isLastOfHighlighted: boolean;
  highlightColor?: string;
  highlightId?: number | string;
}

interface DayProps {
  data: DayInterface;
  enableSelect?: boolean;
  fadeWeekends: boolean;
  handleSelect: (day: DayInterface, resetFunction: () => void) => void;
  showGutterBetweenHighlighted: boolean;
  showMonths: boolean;
  showToday: boolean;
  showYears: boolean;
  showMonthStripes: boolean;
  className?: string;
  textClassName?: string;
  monthTextClassName?: string;
  yearTextClassName?: string;
  highlightedClassName?: string;
  selectedClassName?: string;
  todayClassName?: string;
}

const Day = memo(
  ({
    data,
    showToday,
    showMonths,
    showYears,
    showGutterBetweenHighlighted,
    showMonthStripes,
    fadeWeekends,
    enableSelect = false,
    handleSelect,
    className,
    textClassName = '',
    monthTextClassName = '',
    yearTextClassName = '',
    highlightedClassName = '',
    selectedClassName = '',
    todayClassName = '',
  }: DayProps): JSX.Element => {
    const [selected, setSelected] = useState(false);

    const handleClick = useCallback(() => {
      if (enableSelect && !selected) {
        setSelected(true);
        handleSelect(data, () => setSelected(false));
      }
    }, [enableSelect, handleSelect, selected, data]);

    const baseClass = useMemo<string>(
      () =>
        classnames(
          styles.day,
          {
            [styles.day__month__even]: showMonthStripes && data.isMonthEven,
            [styles.day__first__of__month__text]: data.isFirstDayOfMonth,
            [styles.day__first__of__month]: showMonthStripes && data.isFirstDayOfMonth,
            [styles.day__first__of__month__even]: showMonthStripes && data.isFirstDayOfMonth && data.isMonthEven,
            [styles.day__last__of__month]: showMonthStripes && data.isLastDayOfMonth,
            [styles.day__last__of__month__even]: showMonthStripes && data.isLastDayOfMonth && data.isMonthEven,
            [styles.day__today]: showToday && data.isToday,
            [styles.day__weekend]: data.isWeekend && fadeWeekends,
            [styles.day__selectable]: !!enableSelect,
            [styles.day__selected]: selected,
            [selectedClassName]: selected,
            [todayClassName]: showToday && data.isToday,
          },
          className,
        ),
      [data, showToday, showMonthStripes, fadeWeekends, enableSelect, selected, className, selectedClassName, todayClassName],
    );
    const highlightedClass = useMemo<string>(
      () =>
        classnames(
          styles.day__highlighted,
          {
            [styles.day__highlighted__first]: data.isFirstOfHighlighted,
            [styles.day__highlighted__last]: data.isLastOfHighlighted,
            [styles.day__highlighted__gutter]: showGutterBetweenHighlighted,
          },
          highlightedClassName,
        ),
      [data, showGutterBetweenHighlighted, highlightedClassName],
    );
    const [monthClass, dayClass, yearClass] = useMemo<string[]>(
      () => [
        classnames(styles.day__text__detail, monthTextClassName),
        classnames(styles.day__text, textClassName),
        classnames(styles.day__text__detail, yearTextClassName),
      ],
      [monthTextClassName, textClassName, yearTextClassName],
    );

    return (
      <li className={baseClass} onClick={(enableSelect && handleClick) || undefined} role="presentation">
        {data.isHighlighted && (
          <div
            className={highlightedClass}
            style={{
              backgroundColor: data.highlightColor,
            }}
          />
        )}
        {showMonths && data.isFirstDayOfMonth && <span className={monthClass}>{data.monthLabel}</span>}
        <span className={dayClass}>{data.dayLabel}</span>
        {showYears && data.isFirstDayOfMonth && <span className={yearClass}>{data.yearLabel}</span>}
      </li>
    );
  },
);

export default Day;
