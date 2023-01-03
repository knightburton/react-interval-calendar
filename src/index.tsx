import React, { useCallback, useMemo, useState } from 'react';
import { getCalendarBaseAttributes, defaultBodyCellFormatter } from './helpers';
import { CalendarTuple, VisibilityMatrix, WeekdayIndex } from './types';
import Container, { ContainerProps } from './components/Container';
import Header from './components/Header';
import HeaderContainer, { HeaderContainerProps } from './components/HeaderContainer';
import Body from './components/Body';
import BodyContainer, { BodyContainerProps } from './components/BodyContainer';
import BodyRow from './components/BodyRow';
import BodyCell, { CellInterface } from './components/BodyCell';
import Empty from './components/Empty';

interface IntervalCalendarProps {
  start?: Date;
  end?: Date;
  emptyLabel?: string;
  bodyHeight?: number | '100%' | 'auto';
  bodyCellFormatter?: (cell: CellInterface) => string;
  locale?: string;
  numberOfRowsFirstRender?: number;
  numberOfRowsPreRender?: number;
  onCellClick?: (cell: CellInterface) => void;
  showHeader?: boolean;
  weekStartsOn?: WeekdayIndex;
  containerComponent?: React.ComponentType<ContainerProps>;
  headerContainerComponent?: React.ComponentType<HeaderContainerProps>;
  bodyContainerComponent?: React.ComponentType<BodyContainerProps>;
}

const IntervalCalendar = ({
  start = undefined,
  end = undefined,
  emptyLabel = '',
  bodyHeight = 500,
  bodyCellFormatter = undefined,
  locale = 'default',
  numberOfRowsFirstRender = 8,
  numberOfRowsPreRender = 4,
  onCellClick = undefined,
  showHeader = true,
  weekStartsOn = 0,
  containerComponent: ContainerComponent = Container,
  headerContainerComponent = HeaderContainer,
  bodyContainerComponent: BodyContainerComponent = BodyContainer,
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
    <ContainerComponent>
      {showHeader && <Header weekStartsOn={weekStartsOn} locale={locale} containerComponent={headerContainerComponent} />}
      {!!numberOfWeeks && !!startDate ? (
        <Body
          startDate={startDate}
          numberOfWeeks={numberOfWeeks}
          containerComponent={BodyContainerComponent}
          renderRow={numberOfWeek => (
            <BodyRow
              key={numberOfWeek}
              numberOfWeek={numberOfWeek}
              startDate={startDate}
              locale={locale}
              visibilityMatrix={visibilityMatrix}
              updateVisibilityMatrix={handleVisibilityMatrixChange}
              numberOfRowsPreRender={numberOfRowsPreRender}
              renderCell={cell => <BodyCell key={cell.key} data={cell} formatter={bodyCellFormatter || defaultBodyCellFormatter(locale)} onClick={onCellClick} />}
            />
          )}
        />
      ) : (
        <Empty height={bodyHeight} emptyLabel={emptyLabel} />
      )}
    </ContainerComponent>
  );
};

export default IntervalCalendar;
