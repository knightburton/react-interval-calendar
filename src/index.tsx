import React, { useCallback, useMemo, useState, memo } from 'react';
import { getCalendarBaseAttributes } from './helpers';
import { CalendarTuple, VisibilityMatrix, WeekdayIndex, HeaderCellData, BodyCellData } from './types';
import Container, { ContainerProps } from './components/Container';
import Header, { HeaderProps, HeaderCellContentProps, HeaderCellProps } from './components/Header';
import Body, { BodyProps } from './components/Body';
import { BodyRowProps } from './components/BodyRow';
import { BodyCellProps } from './components/BodyCell';
import { BodyCellContentProps } from './components/BodyCellContent';
import Empty, { EmptyProps } from './components/Empty';

export type {
  ContainerProps,
  HeaderProps,
  HeaderCellProps,
  HeaderCellContentProps,
  BodyProps,
  BodyRowProps,
  BodyCellProps,
  BodyCellContentProps,
  HeaderCellData,
  BodyCellData,
};

type Slots = {
  root?: React.ElementType;
  header?: React.ElementType;
  headerCell?: React.ElementType;
  headerCellContent?: React.ElementType;
  body?: React.ElementType;
  bodyRow?: React.ElementType;
  bodyCell?: React.ElementType;
  bodyCellContent?: React.ElementType;
  empty?: React.ElementType;
};

type SlotProps = {
  root?: ContainerProps;
  header?: HeaderProps;
  headerCell?: HeaderCellProps;
  headerCellContent?: HeaderCellContentProps;
  body?: BodyProps;
  bodyRow?: BodyRowProps;
  bodyCell?: BodyCellProps;
  bodyCellContent?: BodyCellContentProps;
  empty?: EmptyProps;
};

export type IntervalCalendarProps = {
  start?: Date;
  end?: Date;
  locale?: string;
  numberOfRowsFirstRender?: number;
  numberOfRowsPreRender?: number;
  startRenderOnCurrentWeek?: boolean;
  weekStartsOn?: WeekdayIndex;
  slots?: Slots;
  slotProps?: SlotProps;
};

const IntervalCalendar = memo(
  ({
    start = undefined,
    end = undefined,
    locale = 'default',
    numberOfRowsFirstRender = 8,
    numberOfRowsPreRender = 4,
    startRenderOnCurrentWeek = false,
    weekStartsOn = 0,
    slots,
    slotProps,
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
      <Container slots={{ root: slots?.root }} slotProps={{ root: slotProps?.root }}>
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
          <Empty slots={{ root: slots?.empty }} slotProps={{ root: slotProps?.empty }} />
        )}
      </Container>
    );
  },
);

export default IntervalCalendar;
