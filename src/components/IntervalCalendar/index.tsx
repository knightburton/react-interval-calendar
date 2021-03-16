import React, { useCallback, useMemo, useRef, useState } from 'react';

import * as DEFAULT_PROPS from '../../constants/default-props';
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
  showHeader = DEFAULT_PROPS.SHOW_HEADER,
  showWeekdays = DEFAULT_PROPS.SHOW_WEEKDAYS,
  showToday = DEFAULT_PROPS.SHOW_TODAY,
  showMonths = DEFAULT_PROPS.SHOW_MONTHS,
  showYears = DEFAULT_PROPS.SHOW_YEARS,
  showBorder = DEFAULT_PROPS.SHOW_BORDER,
  showBorderRadius = DEFAULT_PROPS.SHOW_BORDER_RADIUS,
  showGutterBetweenHighlighted = DEFAULT_PROPS.SHOW_GUTTER_BETWEEN_HIGHLIGHTED,
  showMonthStripes = DEFAULT_PROPS.SHOW_MONTH_STRIPES,
  weekStartsOn = DEFAULT_PROPS.WEEK_STARTS_ON,
  fadeWeekends = DEFAULT_PROPS.FADE_WEEKENDS,
  height = DEFAULT_PROPS.HEIGHT,
  highlighted = DEFAULT_PROPS.HIGHLIGHTED,
  locale = DEFAULT_PROPS.LOCALE,
  emptyLabel = DEFAULT_PROPS.EMPTY_LABEL,
  onSelect = DEFAULT_PROPS.ON_SELECT,
  numberOfWeekFirstRender = DEFAULT_PROPS.NUMBER_OF_WEEK_FIRST_RENDER,
  numberOfWeekPreRender = DEFAULT_PROPS.NUMBER_OF_WEEK_PRE_RENDER,
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
      showMonthStripes,
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
      showMonthStripes,
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
