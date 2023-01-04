import React, { useCallback, useMemo, useState } from 'react';
import { getCalendarBaseAttributes } from './helpers';
import { CalendarTuple, VisibilityMatrix, WeekdayIndex, BodyCellType } from './types';
import Container, { ContainerProps } from './components/Container';
import Header from './components/Header';
import HeaderContainer, { HeaderContainerProps } from './components/HeaderContainer';
import HeaderCellContent, { HeaderCellContentProps } from './components/HeaderCellContent';
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
  bodyHeight?: number | '100%' | 'auto';
  locale?: string;
  numberOfRowsFirstRender?: number;
  numberOfRowsPreRender?: number;
  onCellClick?: (cell: BodyCellType) => void;
  showHeader?: boolean;
  weekStartsOn?: WeekdayIndex;
  containerComponent?: React.ComponentType<ContainerProps>;
  headerContainerComponent?: React.ComponentType<HeaderContainerProps>;
  headerCellContentComponent?: React.ComponentType<HeaderCellContentProps>;
  bodyContainerComponent?: React.ComponentType<BodyContainerProps>;
  bodyCellContentComponent?: React.ComponentType<BodyCellContentProps>;
  containerClassName?: string;
}

const IntervalCalendar = ({
  start = undefined,
  end = undefined,
  emptyLabel = '',
  bodyHeight = 500,
  locale = 'default',
  numberOfRowsFirstRender = 8,
  numberOfRowsPreRender = 4,
  onCellClick = undefined,
  showHeader = true,
  weekStartsOn = 0,
  containerComponent: ContainerComponent,
  headerContainerComponent = HeaderContainer,
  headerCellContentComponent: HeaderCellContentComponent = HeaderCellContent,
  bodyContainerComponent: BodyContainerComponent = BodyContainer,
  bodyCellContentComponent: BodyCellContentComponent,
  containerClassName = '',
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
    <Container component={ContainerComponent} className={containerClassName}>
      {showHeader && (
        <Header weekStartsOn={weekStartsOn} locale={locale} containerComponent={headerContainerComponent} cellContentComponent={HeaderCellContentComponent} />
      )}
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
              renderCell={cell => <BodyCell key={cell.key} data={cell} locale={locale} onClick={onCellClick} contentComponent={BodyCellContentComponent} />}
            />
          )}
        />
      ) : (
        <Empty height={bodyHeight} emptyLabel={emptyLabel} />
      )}
    </Container>
  );
};

export default IntervalCalendar;
