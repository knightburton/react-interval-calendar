import React, { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import { getCalendarBaseAttributes } from './helpers';
import { CalendarTuple, VisibilityMatrix, WeekdayIndex, HeaderCellData, BodyCellData } from './types';
import useIntervalCalendar from './hooks/useIntervalCalendar';
import { DEFAULT_INTERVAL_CALENDAR_ID, registerScrollToCurrentDate } from './hooks/intervalCalendarController';
import Container, { ContainerProps, ContainerSlotProps, ContainerPropsOverrides } from './components/Container';
import Header, {
  HeaderProps,
  HeaderPropsOverrides,
  HeaderSlotProps,
  HeaderCellProps,
  HeaderCellPropsOverrides,
  HeaderCellSlotProps,
  HeaderCellContentProps,
  HeaderCellContentPropsOverrides,
  HeaderCellContentSlotProps,
} from './components/Header';
import Body, { BodyProps, BodySlotProps, BodyPropsOverrides } from './components/Body';
import { BodyRowProps, BodyRowSlotProps, BodyRowPropsOverrides } from './components/BodyRow';
import { BodyCellProps, BodyCellSlotProps, BodyCellPropsOverrides } from './components/BodyCell';
import { BodyCellContentProps, BodyCellContentSlotProps, BodyCellContentPropsOverrides } from './components/BodyCellContent';
import Empty, { EmptyProps, EmptySlotProps, EmptyPropsOverrides } from './components/Empty';

// Export the override props
export type {
  ContainerPropsOverrides,
  HeaderPropsOverrides,
  HeaderCellPropsOverrides,
  HeaderCellContentPropsOverrides,
  BodyPropsOverrides,
  BodyRowPropsOverrides,
  BodyCellPropsOverrides,
  BodyCellContentPropsOverrides,
  EmptyPropsOverrides,
};
// Export the normal props
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
  EmptyProps,
};

// Export the hooks
export { useIntervalCalendar };

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
  root?: ContainerSlotProps;
  header?: HeaderSlotProps;
  headerCell?: HeaderCellSlotProps;
  headerCellContent?: HeaderCellContentSlotProps;
  body?: BodySlotProps;
  bodyRow?: BodyRowSlotProps;
  bodyCell?: BodyCellSlotProps;
  bodyCellContent?: BodyCellContentSlotProps;
  empty?: EmptySlotProps;
};

export type IntervalCalendarProps = {
  id?: string;
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
    id = DEFAULT_INTERVAL_CALENDAR_ID,
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
    const todayRowRef = useRef<HTMLUListElement | null>(null);
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

    const handleTodayRowMount = useCallback((element: HTMLUListElement | null): void => {
      todayRowRef.current = element;
    }, []);

    const handleScrollToCurrentDate = useCallback((): void => {
      if (todayRowRef.current) todayRowRef.current.scrollIntoView();
    }, []);

    useEffect(() => {
      return registerScrollToCurrentDate(id, handleScrollToCurrentDate);
    }, [id, handleScrollToCurrentDate]);

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
            onTodayRowMount={handleTodayRowMount}
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
