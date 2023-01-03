import React, { memo, useMemo } from 'react';
import { HeaderCell as HeaderCellType, WeekdayIndex } from '../types';
import { getHeaderWeekdays } from '../helpers';
import { HeaderContainerProps } from './HeaderContainer';
import { HeaderRowProps } from './HeaderRow';
import { HeaderCellProps } from './HeaderCell';

export interface HeaderProps {
  weekStartsOn: WeekdayIndex;
  locale: string;
  containerComponent: React.ComponentType<HeaderContainerProps>;
  rowComponent: React.ComponentType<HeaderRowProps>;
  cellComponent: React.FC<HeaderCellProps>;
}

const Header = memo(
  ({ weekStartsOn, locale, containerComponent: ContainerComponent, rowComponent: RowComponent, cellComponent: CellComponent }: HeaderProps): JSX.Element => {
    const weekdays = useMemo<HeaderCellType[]>(() => getHeaderWeekdays(weekStartsOn, locale), [weekStartsOn, locale]);

    return (
      <ContainerComponent>
        <RowComponent>
          {weekdays.map(weekday => (
            <CellComponent key={weekday.key} data={weekday} />
          ))}
        </RowComponent>
      </ContainerComponent>
    );
  },
);

export default Header;
