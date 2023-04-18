import React, { useCallback, useMemo, useState } from 'react';
import { getCalendarBaseAttributes } from './helpers';
import { CalendarTuple, VisibilityMatrix, WeekdayIndex, BodyCellType } from './types';
import Container, { ContainerProps } from './components/Container';
import Header from './components/Header';
import { HeaderContainerProps } from './components/HeaderContainer';
import { HeaderCellContentProps } from './components/HeaderCellContent';
import Body from './components/Body';
import { BodyContainerProps } from './components/BodyContainer';
import BodyRow from './components/BodyRow';
import BodyCell from './components/BodyCell';
import { BodyCellContentProps } from './components/BodyCellContent';
import Empty, { EmptyProps } from './components/Empty';

export interface IntervalCalendarProps {
  start?: Date;
  end?: Date;
  emptyLabel?: string;
  height?: number | '100%' | 'auto';
  locale?: string;
  numberOfRowsFirstRender?: number;
  numberOfRowsPreRender?: number;
  startRenderOnCurrentWeek?: boolean;
  onCellClick?: (data: BodyCellType) => void;
  showHeader?: boolean;
  weekStartsOn?: WeekdayIndex;
  containerComponent?: React.ComponentType<ContainerProps>;
  headerContainerComponent?: React.ComponentType<HeaderContainerProps>;
  headerCellContentComponent?: React.ComponentType<HeaderCellContentProps>;
  bodyContainerComponent?: React.ComponentType<BodyContainerProps>;
  bodyCellContentComponent?: React.ComponentType<BodyCellContentProps>;
  emptyComponent?: React.ComponentType<EmptyProps>;
  containerClassName?: string;
  headerContainerClassName?: string;
  headerRowClassName?: string;
  headerCellClassName?: string;
  headerCellContentClassName?: string;
  bodyContainerClassName?: string;
  bodyRowClassName?: string;
  bodyCellClassName?: string;
  bodyCellContentClassName?: string;
  emptyClassName?: string;
}

const IntervalCalendar = ({
  start = undefined,
  end = undefined,
  emptyLabel = '',
  height = 500,
  locale = 'default',
  numberOfRowsFirstRender = 8,
  numberOfRowsPreRender = 4,
  startRenderOnCurrentWeek = false,
  onCellClick = undefined,
  showHeader = true,
  weekStartsOn = 0,
  containerComponent,
  headerContainerComponent,
  headerCellContentComponent,
  bodyContainerComponent,
  bodyCellContentComponent,
  emptyComponent,
  containerClassName = '',
  headerContainerClassName = '',
  headerRowClassName = '',
  headerCellClassName = '',
  headerCellContentClassName = '',
  bodyContainerClassName = '',
  bodyRowClassName = '',
  bodyCellClassName = '',
  bodyCellContentClassName = '',
  emptyClassName = '',
}: IntervalCalendarProps): JSX.Element => {
  const [startDate, , numberOfWeeks, numberOfTodayWeek] = useMemo<CalendarTuple>(() => getCalendarBaseAttributes(start, end, weekStartsOn), [start, end, weekStartsOn]);

  const [visibilityMatrix, setVisibilityMatrix] = useState<VisibilityMatrix>(
    Array(startRenderOnCurrentWeek ? numberOfTodayWeek + numberOfRowsFirstRender : numberOfRowsFirstRender)
      .fill(null)
      .reduce((acc: VisibilityMatrix, _, week) => ({ ...acc, [week]: startRenderOnCurrentWeek ? !(week < numberOfTodayWeek) : true }), {}),
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

  return (
    <Container height={height} component={containerComponent} className={containerClassName}>
      <Header
        weekStartsOn={weekStartsOn}
        locale={locale}
        enabled={showHeader}
        containerComponent={headerContainerComponent}
        cellContentComponent={headerCellContentComponent}
        containerClassName={headerContainerClassName}
        rowClassName={headerRowClassName}
        cellClassName={headerCellClassName}
        cellContentClassName={headerCellContentClassName}
      />
      {!!numberOfWeeks && !!startDate ? (
        <Body
          startDate={startDate}
          numberOfWeeks={numberOfWeeks}
          containerComponent={bodyContainerComponent}
          containerClassName={bodyContainerClassName}
          renderRow={numberOfWeek => (
            <BodyRow
              key={numberOfWeek}
              numberOfWeek={numberOfWeek}
              numberOfTodayWeek={numberOfTodayWeek}
              startRenderOnCurrentWeek={startRenderOnCurrentWeek}
              startDate={startDate}
              locale={locale}
              visibilityMatrix={visibilityMatrix}
              updateVisibilityMatrix={handleVisibilityMatrixChange}
              numberOfRowsPreRender={numberOfRowsPreRender}
              className={bodyRowClassName}
              renderCell={cell => (
                <BodyCell
                  key={cell.key}
                  data={cell}
                  locale={locale}
                  onClick={onCellClick}
                  contentComponent={bodyCellContentComponent}
                  className={bodyCellClassName}
                  contentClassName={bodyCellContentClassName}
                />
              )}
            />
          )}
        />
      ) : (
        <Empty emptyLabel={emptyLabel} className={emptyClassName} component={emptyComponent} />
      )}
    </Container>
  );
};

export default IntervalCalendar;
