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
  start = DEFAULT_PROPS.START,
  end = DEFAULT_PROPS.END,
  theme = DEFAULT_PROPS.THEME,
  showHeader = DEFAULT_PROPS.SHOW_HEADER,
  showHeaderWeekdays = DEFAULT_PROPS.SHOW_HEADER_WEEKDAYS,
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
  highlightedColorAlpha = DEFAULT_PROPS.HIGHLIGHTED_COLOR_ALPHA,
  locale = DEFAULT_PROPS.LOCALE,
  emptyLabel = DEFAULT_PROPS.EMPTY_LABEL,
  onSelect = DEFAULT_PROPS.ON_SELECT,
  numberOfWeekFirstRender = DEFAULT_PROPS.NUMBER_OF_WEEK_FIRST_RENDER,
  numberOfWeekPreRender = DEFAULT_PROPS.NUMBER_OF_WEEK_PRE_RENDER,
  customClassNames = DEFAULT_PROPS.CUSTOM_CLASS_NAMES,
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

  const weeksHeight = useMemo<WeeksHeight>(() => getWeeksHeight(showHeader, showHeaderWeekdays, height), [showHeader, showHeaderWeekdays, height]);

  const contextValue = useMemo<ContextType>(
    () => ({
      startDate,
      numberOfWeeks,
      theme,
      showHeaderWeekdays,
      showToday,
      showMonths,
      showYears,
      showGutterBetweenHighlighted,
      showMonthStripes,
      weekStartsOn,
      fadeWeekends,
      weeksHeight,
      highlighted,
      highlightedColorAlpha,
      locale,
      emptyLabel,
      handleSelect: (onSelect && handleSelect) || undefined,
      visibilityMatrix,
      updateVisibilityMatrix: handleVisibilityMatrixChange,
      numberOfWeekPreRender,
      customClassNames,
    }),
    [
      startDate,
      numberOfWeeks,
      theme,
      showHeaderWeekdays,
      showToday,
      showMonths,
      showYears,
      showGutterBetweenHighlighted,
      showMonthStripes,
      weekStartsOn,
      fadeWeekends,
      weeksHeight,
      highlighted,
      highlightedColorAlpha,
      locale,
      emptyLabel,
      handleSelect,
      onSelect,
      visibilityMatrix,
      handleVisibilityMatrixChange,
      numberOfWeekPreRender,
      customClassNames,
    ],
  );

  const className = useMemo<string>(
    () =>
      classnames(
        styles.calendar,
        {
          [styles.calendar__border]: showBorder,
          [styles.calendar__border__radius]: showBorder && showBorderRadius,
        },
        customClassNames?.calendar,
      ),
    [showBorder, showBorderRadius, customClassNames.calendar],
  );

  return (
    <Context.Provider value={contextValue}>
      <div
        data-theme={theme}
        className={className}
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
