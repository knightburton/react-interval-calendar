import React, { useCallback, useMemo, useRef, useState } from 'react';
import * as DEFAULT_PROPS from '../../constants/default-props';
import Context from '../../context';
import { getCalendarBaseAttributes, getWeeksHeight } from '../../helpers';
import { IntervalCalendarProps } from '../../interfaces/IntervalCalendar.interface';
import { Day } from '../../interfaces/IntervalCalendarDay.interface';
import { CalendarTuple, VisibilityMatrix, WeeksHeight, ContextType } from '../../types';
import classnames from '../../utils/classnames';
import IntervalCalendarEmpty from '../IntervalCalendarEmpty';
import IntervalCalendarHeader from '../IntervalCalendarHeader';
import IntervalCalendarWeeks from '../IntervalCalendarWeeks';
import styles from './styles.less';

const IntervalCalendar = ({
  start = DEFAULT_PROPS.START,
  end = DEFAULT_PROPS.END,
  customClassNames = DEFAULT_PROPS.CUSTOM_CLASS_NAMES,
  enableSelect = DEFAULT_PROPS.ENABLE_SELECT,
  emptyLabel = DEFAULT_PROPS.EMPTY_LABEL,
  fadeWeekends = DEFAULT_PROPS.FADE_WEEKENDS,
  height = DEFAULT_PROPS.HEIGHT,
  highlighted = DEFAULT_PROPS.HIGHLIGHTED,
  highlightedColorAlpha = DEFAULT_PROPS.HIGHLIGHTED_COLOR_ALPHA,
  locale = DEFAULT_PROPS.LOCALE,
  numberOfWeekFirstRender = DEFAULT_PROPS.NUMBER_OF_WEEK_FIRST_RENDER,
  numberOfWeekPreRender = DEFAULT_PROPS.NUMBER_OF_WEEK_PRE_RENDER,
  onSelect = DEFAULT_PROPS.ON_SELECT,
  showBorder = DEFAULT_PROPS.SHOW_BORDER,
  showBorderRadius = DEFAULT_PROPS.SHOW_BORDER_RADIUS,
  showGutterBetweenHighlighted = DEFAULT_PROPS.SHOW_GUTTER_BETWEEN_HIGHLIGHTED,
  showHeader = DEFAULT_PROPS.SHOW_HEADER,
  showHeaderWeekdays = DEFAULT_PROPS.SHOW_HEADER_WEEKDAYS,
  showMonthStripes = DEFAULT_PROPS.SHOW_MONTH_STRIPES,
  showMonths = DEFAULT_PROPS.SHOW_MONTHS,
  showToday = DEFAULT_PROPS.SHOW_TODAY,
  showYears = DEFAULT_PROPS.SHOW_YEARS,
  theme = DEFAULT_PROPS.THEME,
  weekStartsOn = DEFAULT_PROPS.WEEK_STARTS_ON,
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
      if (enableSelect && onSelect) onSelect(day);
      if (enableSelect && previousResetFunction.current) previousResetFunction.current();
      previousResetFunction.current = resetFunction;
    },
    [previousResetFunction, enableSelect, onSelect],
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
      customClassNames,
      enableSelect,
      emptyLabel,
      fadeWeekends,
      handleSelect,
      highlighted,
      highlightedColorAlpha,
      locale,
      numberOfWeekPreRender,
      numberOfWeeks,
      showGutterBetweenHighlighted,
      showHeaderWeekdays,
      showMonthStripes,
      showMonths,
      showToday,
      showYears,
      startDate,
      theme,
      updateVisibilityMatrix: handleVisibilityMatrixChange,
      visibilityMatrix,
      weekStartsOn,
      weeksHeight,
    }),
    [
      customClassNames,
      enableSelect,
      emptyLabel,
      fadeWeekends,
      handleSelect,
      handleVisibilityMatrixChange,
      highlighted,
      highlightedColorAlpha,
      locale,
      numberOfWeekPreRender,
      numberOfWeeks,
      showGutterBetweenHighlighted,
      showHeaderWeekdays,
      showMonthStripes,
      showMonths,
      showToday,
      showYears,
      startDate,
      theme,
      visibilityMatrix,
      weekStartsOn,
      weeksHeight,
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
        customClassNames.calendar,
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
