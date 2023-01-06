import React, { memo, useMemo } from 'react';
import { HeaderCellType, WeekdayIndex } from '../types';
import { getHeaderWeekdays } from '../helpers';
import classnames from '../utils/classnames';
import HeaderContainer, { HeaderContainerProps } from './HeaderContainer';
import HeaderCellContent, { HeaderCellContentProps } from './HeaderCellContent';
import styles from './styles.less';

export interface HeaderProps {
  weekStartsOn: WeekdayIndex;
  locale: string;
  enabled: boolean;
  containerComponent?: React.FC<HeaderContainerProps>;
  cellContentComponent?: React.FC<HeaderCellContentProps>;
  containerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  cellContentClassName?: string;
}

const Header = memo(
  ({
    weekStartsOn,
    locale,
    enabled,
    containerComponent: ContainerComponent,
    cellContentComponent: CellContentComponent,
    containerClassName,
    rowClassName,
    cellClassName,
    cellContentClassName,
  }: HeaderProps): JSX.Element | null => {
    const list = useMemo<HeaderCellType[]>(() => getHeaderWeekdays(weekStartsOn, locale), [weekStartsOn, locale]);
    const rowClasses = useMemo<string>(() => classnames(styles.header__row, rowClassName), [rowClassName]);
    const cellClasses = useMemo<string>(() => classnames(styles.header__cell, cellClassName), [cellClassName]);

    if (!enabled) return null;
    return (
      <HeaderContainer component={ContainerComponent} className={containerClassName}>
        <ul className={rowClasses}>
          {list.map(data => (
            <li key={data.id} className={cellClasses}>
              <HeaderCellContent data={data} className={cellContentClassName} component={CellContentComponent} />
            </li>
          ))}
        </ul>
      </HeaderContainer>
    );
  },
);

export default Header;
