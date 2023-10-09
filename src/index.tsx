import React, { useCallback, useMemo, useState } from 'react';
import { getCalendarBaseAttributes } from './helpers';
import { CalendarTuple, VisibilityMatrix, WeekdayIndex } from './types';
import Container, { ContainerProps } from './components/Container';
import Header, { HeaderProps, HeaderCellContentProps, HeaderCellProps } from './components/Header';
import Body, { BodyProps } from './components/Body';
import { BodyRowProps } from './components/BodyRow';
import { BodyCellProps } from './components/BodyCell';
import { BodyCellContentProps } from './components/BodyCellContent';
import Empty, { EmptyProps } from './components/Empty';

export type { ContainerProps, HeaderProps, HeaderCellProps, HeaderCellContentProps, BodyProps, BodyRowProps, BodyCellProps, BodyCellContentProps };

type ClassNames = {
  empty?: string;
};

type Slots = {
  container?: React.ElementType;
  header?: React.ElementType;
  headerCell?: React.ElementType;
  headerCellContent?: React.ElementType;
  body?: React.ElementType;
  bodyRow?: React.ElementType;
  bodyCell?: React.ElementType;
  bodyCellContent?: React.ElementType;
};

type SlotProps = {
  container?: ContainerProps;
  header?: HeaderProps;
  headerCell?: HeaderCellProps;
  headerCellContent?: HeaderCellContentProps;
  body?: BodyProps;
  bodyRow?: BodyRowProps;
  bodyCell?: BodyCellProps;
  bodyCellContent?: BodyCellContentProps;
};

export type IntervalCalendarProps = {
  start?: Date;
  end?: Date;
  emptyLabel?: string;
  locale?: string;
  numberOfRowsFirstRender?: number;
  numberOfRowsPreRender?: number;
  startRenderOnCurrentWeek?: boolean;
  weekStartsOn?: WeekdayIndex;
  emptyComponent?: React.ComponentType<EmptyProps>;
  slots?: Slots;
  slotProps?: SlotProps;
  classNames?: ClassNames;
};

const IntervalCalendar = ({
  start = undefined,
  end = undefined,
  emptyLabel = '',
  locale = 'default',
  numberOfRowsFirstRender = 8,
  numberOfRowsPreRender = 4,
  startRenderOnCurrentWeek = false,
  weekStartsOn = 0,
  emptyComponent,
  slots,
  slotProps,
  classNames,
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
    <Container slots={{ root: slots?.container }} slotProps={{ root: slotProps?.container }}>
      <Header
        weekStartsOn={weekStartsOn}
        locale={locale}
        slots={{ root: slots?.header, cell: slots?.headerCell, cellContent: slots?.headerCellContent }}
        slotProps={{ root: slotProps?.header, cell: slotProps?.headerCell, cellContent: slotProps?.headerCellContent }}
      />
      {!!numberOfWeeks && !!startDate ? (
        <Body
          startDate={startDate}
          numberOfWeeks={numberOfWeeks}
          numberOfTodayWeek={numberOfTodayWeek}
          startRenderOnCurrentWeek={startRenderOnCurrentWeek}
          locale={locale}
          visibilityMatrix={visibilityMatrix}
          updateVisibilityMatrix={handleVisibilityMatrixChange}
          numberOfRowsPreRender={numberOfRowsPreRender}
          slots={{ root: slots?.body, row: slots?.bodyRow, cell: slots?.bodyCell, cellContent: slots?.bodyCellContent }}
          slotProps={{ root: slotProps?.body, row: slotProps?.bodyRow, cell: slotProps?.bodyCell, cellContent: slotProps?.bodyCellContent }}
        />
      ) : (
        <Empty emptyLabel={emptyLabel} className={classNames?.empty} component={emptyComponent} />
      )}
    </Container>
  );
};

export default IntervalCalendar;
