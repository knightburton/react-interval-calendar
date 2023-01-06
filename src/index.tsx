import React, { useCallback, useMemo, useState } from 'react';
import { getCalendarBaseAttributes } from './helpers';
import { CalendarTuple, VisibilityMatrix, WeekdayIndex, BodyCellType } from './types';
import Container, { ContainerProps } from './components/Container';
import Header from './components/Header';
import { HeaderContainerProps } from './components/HeaderContainer';
import { HeaderCellContentProps } from './components/HeaderCellContent';
import Body from './components/Body';
import BodyContainer, { BodyContainerProps } from './components/BodyContainer';
import BodyRow from './components/BodyRow';
import BodyCell from './components/BodyCell';
import { BodyCellContentProps } from './components/BodyCellContent';
import Empty from './components/Empty';

interface IntervalCalendarProps {
  start?: Date;
  end?: Date;
  emptyLabel?: string;
  height?: number | '100%' | 'auto';
  locale?: string;
  numberOfRowsFirstRender?: number;
  numberOfRowsPreRender?: number;
  onCellClick?: (data: BodyCellType) => void;
  showHeader?: boolean;
  weekStartsOn?: WeekdayIndex;
  containerComponent?: React.FC<ContainerProps>;
  headerContainerComponent?: React.FC<HeaderContainerProps>;
  headerCellContentComponent?: React.FC<HeaderCellContentProps>;
  bodyContainerComponent?: React.FC<BodyContainerProps>;
  bodyCellContentComponent?: React.FC<BodyCellContentProps>;
  containerClassName?: string;
  headerContainerClassName?: string;
  headerRowClassName?: string;
  headerCellClassName?: string;
  headerCellContentClassName?: string;
  bodyContainerClassName?: string;
  bodyRowClassName?: string;
  bodyCellClassName?: string;
  bodyCellContentClassName?: string;
}

const IntervalCalendar = ({
  start = undefined,
  end = undefined,
  emptyLabel = '',
  height = 500,
  locale = 'default',
  numberOfRowsFirstRender = 8,
  numberOfRowsPreRender = 4,
  onCellClick = undefined,
  showHeader = true,
  weekStartsOn = 0,
  containerComponent: ContainerComponent,
  headerContainerComponent: HeaderContainerComponent,
  headerCellContentComponent: HeaderCellContentComponent,
  bodyContainerComponent: BodyContainerComponent = BodyContainer,
  bodyCellContentComponent: BodyCellContentComponent,
  containerClassName = '',
  headerContainerClassName = '',
  headerRowClassName = '',
  headerCellClassName = '',
  headerCellContentClassName = '',
  bodyContainerClassName = '',
  bodyRowClassName = '',
  bodyCellClassName = '',
  bodyCellContentClassName = '',
}: IntervalCalendarProps): JSX.Element => {
  const [visibilityMatrix, setVisibilityMatrix] = useState<VisibilityMatrix>(
    Array(numberOfRowsFirstRender)
      .fill(null)
      .reduce((acc: VisibilityMatrix, _, week) => ({ ...acc, [week]: true }), {}),
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

  return (
    <Container height={height} component={ContainerComponent} className={containerClassName}>
      <Header
        weekStartsOn={weekStartsOn}
        locale={locale}
        enabled={showHeader}
        containerComponent={HeaderContainerComponent}
        cellContentComponent={HeaderCellContentComponent}
        containerClassName={headerContainerClassName}
        rowClassName={headerRowClassName}
        cellClassName={headerCellClassName}
        cellContentClassName={headerCellContentClassName}
      />
      {!!numberOfWeeks && !!startDate ? (
        <Body
          startDate={startDate}
          numberOfWeeks={numberOfWeeks}
          containerComponent={BodyContainerComponent}
          containerClassName={bodyContainerClassName}
          renderRow={numberOfWeek => (
            <BodyRow
              key={numberOfWeek}
              numberOfWeek={numberOfWeek}
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
                  contentComponent={BodyCellContentComponent}
                  className={bodyCellClassName}
                  contentClassName={bodyCellContentClassName}
                />
              )}
            />
          )}
        />
      ) : (
        <Empty emptyLabel={emptyLabel} />
      )}
    </Container>
  );
};

export default IntervalCalendar;
