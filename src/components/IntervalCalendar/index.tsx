import React, { useCallback, useMemo, useRef, useState } from 'react';

import { NUMBER_OF_WEEK_FIRST_RENDER, NUMBER_OF_WEEK_PRE_RENDER } from '../../constants/default-props';
import Context from '../../context';
import { getCalendarBaseAttributes, getWeeksHeight } from '../../helpers';
import { IntervalCalendarProps } from '../../interfaces/IntervalCalendar.interface';
import { Day } from '../../interfaces/IntervalCalendarDay.interface';
import classnames from '../../utils/classnames';
import IntervalCalendarEmpty from '../IntervalCalendarEmpty';
import IntervalCalendarHeader from '../IntervalCalendarHeader';
import IntervalCalendarWeeks from '../IntervalCalendarWeeks';
import styles from './styles.less';

const IntervalCalendar = ({
  start,
  end,
  showHeader = true,
  showWeekdays = true,
  showToday = true,
  showMonths = false,
  showYears = false,
  showBorder = false,
  showBorderRadius = false,
  showGutterBetweenHighlighted = false,
  weekStartsOn = 0,
  fadeWeekends = false,
  height = 500,
  highlighted = [],
  locale = 'default',
  emptyLabel = '',
  onSelect,
  numberOfWeekFirstRender = NUMBER_OF_WEEK_FIRST_RENDER,
  numberOfWeekPreRender = NUMBER_OF_WEEK_PRE_RENDER,
}: IntervalCalendarProps): JSX.Element => {
  // useState hooks
  const [visibilityMatrix, setVisibilityMatrix] = useState<VisibilityMatrix>(
    Array(numberOfWeekFirstRender)
      .fill(null)
      .reduce((acc: VisibilityMatrix, _, week) => ({ ...acc, [week]: true }), {}),
  );

  // useRef hooks
  const previousResetFunction = useRef<() => void | undefined>();

  // useCallback hooks
  const handleSelect = useCallback<(day: Day, resetFunction: () => void) => void>(
    (day: Day, resetFunction: () => void) => {
      if (onSelect) onSelect(day);
      if (previousResetFunction.current) previousResetFunction.current();
      previousResetFunction.current = resetFunction;
    },
    [previousResetFunction, onSelect],
  );
  const handleVisibilityMatrixChange = useCallback(
    (week: number) => {
      setVisibilityMatrix(prevState => ({
        ...prevState,
        [week]: true,
      }));
    },
    [setVisibilityMatrix],
  );

  // use memo hooks
  const [startDate, , numberOfWeeks] = useMemo<CalendarTuple>(() => getCalendarBaseAttributes(start, end, weekStartsOn), [start, end, weekStartsOn]);

  const weeksHeight = useMemo<WeeksHeight>(() => getWeeksHeight(showHeader, showWeekdays, height), [showHeader, showWeekdays, height]);

  const contextValue = useMemo<ContextType>(
    () => ({
      startDate,
      numberOfWeeks,
      showWeekdays,
      showToday,
      showMonths,
      showYears,
      showGutterBetweenHighlighted,
      weekStartsOn,
      fadeWeekends,
      weeksHeight,
      highlighted,
      locale,
      emptyLabel,
      handleSelect: (onSelect && handleSelect) || undefined,
      visibilityMatrix,
      updateVisibilityMatrix: handleVisibilityMatrixChange,
      numberOfWeekPreRender,
    }),
    [
      startDate,
      numberOfWeeks,
      showWeekdays,
      showToday,
      showMonths,
      showYears,
      showGutterBetweenHighlighted,
      weekStartsOn,
      fadeWeekends,
      weeksHeight,
      highlighted,
      locale,
      emptyLabel,
      handleSelect,
      onSelect,
      visibilityMatrix,
      handleVisibilityMatrixChange,
      numberOfWeekPreRender,
    ],
  );

  const classNames = useMemo<string>(
    () =>
      classnames(styles.calendar, {
        [styles.calendar__border]: showBorder,
        [styles.calendar__border__radius]: showBorder && showBorderRadius,
      }),
    [showBorder, showBorderRadius],
  );

  return (
    <Context.Provider value={contextValue}>
      <div
        className={classNames}
        style={{
          height,
        }}
      >
        {showHeader && <IntervalCalendarHeader />}
        {numberOfWeeks && startDate ? <IntervalCalendarWeeks /> : <IntervalCalendarEmpty />}
      </div>
    </Context.Provider>
  );
};

export default IntervalCalendar;
