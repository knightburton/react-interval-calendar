import React, { useCallback, useMemo, useState } from 'react';
import { getCalendarBaseAttributes } from './helpers';
import { CalendarTuple, VisibilityMatrix, WeekdayIndex, BodyCellType } from './types';
import Container, { ContainerProps, ContainerPrivateProps } from './components/Container';
import Header from './components/Header';
import { HeaderContainerProps } from './components/HeaderContainer';
import { HeaderCellContentProps } from './components/HeaderCellContent';
import Body from './components/Body';
import { BodyContainerProps } from './components/BodyContainer';
import BodyRow from './components/BodyRow';
import BodyCell from './components/BodyCell';
import { BodyCellContentProps } from './components/BodyCellContent';
import Empty, { EmptyProps } from './components/Empty';

export type { ContainerProps } from './components/Container';

type ClassNames = {
  headerContainer?: string;
  headerRow?: string;
  headerCell?: string;
  headerCellContent?: string;
  bodyContainer?: string;
  bodyRow?: string;
  bodyCell?: string;
  bodyCellContent?: string;
  empty?: string;
};

type Slots = {
  container?: ContainerPrivateProps['slots'];
};

type SlotProps = {
  container?: ContainerPrivateProps['slotProps'];
};

export type IntervalCalendarProps = {
  start?: Date;
  end?: Date;
  emptyLabel?: string;
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
  onCellClick = undefined,
  showHeader = true,
  weekStartsOn = 0,
  headerContainerComponent,
  headerCellContentComponent,
  bodyContainerComponent,
  bodyCellContentComponent,
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
    <Container slots={slots?.container} slotProps={slotProps?.container}>
      <Header
        weekStartsOn={weekStartsOn}
        locale={locale}
        enabled={showHeader}
        containerComponent={headerContainerComponent}
        cellContentComponent={headerCellContentComponent}
        containerClassName={classNames?.headerContainer}
        rowClassName={classNames?.headerRow}
        cellClassName={classNames?.headerCell}
        cellContentClassName={classNames?.headerCellContent}
      />
      {!!numberOfWeeks && !!startDate ? (
        <Body
          startDate={startDate}
          numberOfWeeks={numberOfWeeks}
          containerComponent={bodyContainerComponent}
          containerClassName={classNames?.bodyContainer}
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
              className={classNames?.bodyRow}
              renderCell={cell => (
                <BodyCell
                  key={cell.key}
                  data={cell}
                  locale={locale}
                  onClick={onCellClick}
                  contentComponent={bodyCellContentComponent}
                  className={classNames?.bodyCell}
                  contentClassName={classNames?.bodyCellContent}
                />
              )}
            />
          )}
        />
      ) : (
        <Empty emptyLabel={emptyLabel} className={classNames?.empty} component={emptyComponent} />
      )}
    </Container>
  );
};

export default IntervalCalendar;
