import React, { useCallback, useMemo, useRef, useState } from 'react';
import { getCalendarBaseAttributes, getWeeksHeight } from './helpers';
import { CalendarTuple, VisibilityMatrix, WeeksHeight, HighlightedItem, ThemeOption, WeekdayIndex } from './types';
import Container, { ContainerProps } from './components/Container';
import Header from './components/Header';
import HeaderContainer, { HeaderContainerProps } from './components/HeaderContainer';
import HeaderRow, { HeaderRowProps } from './components/HeaderRow';
import HeaderCell, { HeaderCellProps } from './components/HeaderCell';
import Empty from './components/Empty';
import Weeks from './components/Weeks';
import Week from './components/Week';
import Day, { DayInterface } from './components/Day';

interface IntervalCalendarProps {
  start?: Date;
  end?: Date;
  enableSelect?: boolean;
  emptyLabel?: string;
  fadeWeekends?: boolean;
  height?: number | '100%' | 'auto';
  highlighted?: HighlightedItem[];
  highlightedColorAlpha?: number;
  locale?: string;
  numberOfWeekFirstRender?: number;
  numberOfWeekPreRender?: number;
  onSelect?: (day: DayInterface) => void;
  showGutterBetweenHighlighted?: boolean;
  showHeader?: boolean;
  showHeaderWeekdays?: boolean;
  showMonthStripes?: boolean;
  showMonths?: boolean;
  showToday?: boolean;
  showYears?: boolean;
  theme?: ThemeOption;
  weekStartsOn?: WeekdayIndex;
  containerComponent?: React.ComponentType<ContainerProps>;
  headerContainerComponent?: React.ComponentType<HeaderContainerProps>;
  headerRowComponent?: React.ComponentType<HeaderRowProps>;
  headerCellComponent?: React.FC<HeaderCellProps>;
  emptyClassName?: string;
  weeksClassName?: string;
  weekClassName?: string;
  dayClassName?: string;
  dayTextClassName?: string;
  dayMonthTextClassName?: string;
  dayYearTextClassName?: string;
  dayHighlightedClassName?: string;
  daySelectedClassName?: string;
  dayTodayClassName?: string;
}

const IntervalCalendar = ({
  start = undefined,
  end = undefined,
  enableSelect = false,
  emptyLabel = '',
  fadeWeekends = false,
  height = 500,
  highlighted = [],
  highlightedColorAlpha = 0.2,
  locale = 'default',
  numberOfWeekFirstRender = 8,
  numberOfWeekPreRender = 4,
  onSelect = undefined,
  showGutterBetweenHighlighted = false,
  showHeader = true,
  showHeaderWeekdays = true,
  showMonthStripes = true,
  showMonths = false,
  showToday = true,
  showYears = false,
  theme = 'light',
  weekStartsOn = 0,
  containerComponent: ContainerComponent = Container,
  headerContainerComponent = HeaderContainer,
  headerRowComponent = HeaderRow,
  headerCellComponent = HeaderCell,
  emptyClassName = '',
  weeksClassName = '',
  weekClassName = '',
  dayClassName = '',
  dayTextClassName = '',
  dayMonthTextClassName = '',
  dayYearTextClassName = '',
  dayHighlightedClassName = '',
  daySelectedClassName = '',
  dayTodayClassName = '',
}: IntervalCalendarProps): JSX.Element => {
  const [visibilityMatrix, setVisibilityMatrix] = useState<VisibilityMatrix>(
    Array(numberOfWeekFirstRender)
      .fill(null)
      .reduce((acc: VisibilityMatrix, _, week) => ({ ...acc, [week]: true }), {}),
  );

  const previousResetFunction = useRef<() => void | undefined>();

  const handleSelect = useCallback<(day: DayInterface, resetFunction: () => void) => void>(
    (day: DayInterface, resetFunction: () => void) => {
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

  const [startDate, , numberOfWeeks] = useMemo<CalendarTuple>(() => getCalendarBaseAttributes(start, end, weekStartsOn), [start, end, weekStartsOn]);
  const weeksHeight = useMemo<WeeksHeight>(() => getWeeksHeight(showHeader, showHeaderWeekdays, height), [showHeader, showHeaderWeekdays, height]);

  return (
    <ContainerComponent>
      {showHeader && (
        <Header
          weekStartsOn={weekStartsOn}
          locale={locale}
          containerComponent={headerContainerComponent}
          rowComponent={headerRowComponent}
          cellComponent={headerCellComponent}
        />
      )}
      {numberOfWeeks && startDate ? (
        <Weeks
          startDate={startDate}
          numberOfWeeks={numberOfWeeks}
          weeksHeight={weeksHeight}
          className={weeksClassName}
          renderWeek={numberOfWeek => (
            <Week
              key={numberOfWeek}
              numberOfWeek={numberOfWeek}
              highlighted={highlighted}
              highlightedColorAlpha={highlightedColorAlpha}
              locale={locale}
              numberOfWeekPreRender={numberOfWeekPreRender}
              startDate={startDate}
              theme={theme}
              updateVisibilityMatrix={handleVisibilityMatrixChange}
              visibilityMatrix={visibilityMatrix}
              className={weekClassName}
              renderDay={day => (
                <Day
                  key={day.key}
                  data={day}
                  enableSelect={enableSelect}
                  fadeWeekends={fadeWeekends}
                  handleSelect={handleSelect}
                  showGutterBetweenHighlighted={showGutterBetweenHighlighted}
                  showMonths={showMonths}
                  showToday={showToday}
                  showYears={showYears}
                  showMonthStripes={showMonthStripes}
                  className={dayClassName}
                  textClassName={dayTextClassName}
                  monthTextClassName={dayMonthTextClassName}
                  yearTextClassName={dayYearTextClassName}
                  highlightedClassName={dayHighlightedClassName}
                  selectedClassName={daySelectedClassName}
                  todayClassName={dayTodayClassName}
                />
              )}
            />
          )}
        />
      ) : (
        <Empty weeksHeight={weeksHeight} emptyLabel={emptyLabel} className={emptyClassName} />
      )}
    </ContainerComponent>
  );
};

export default IntervalCalendar;
