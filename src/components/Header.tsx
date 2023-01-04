import React, { memo, useMemo } from 'react';
import { HeaderCellType, WeekdayIndex } from '../types';
import { getHeaderWeekdays } from '../helpers';
import { HeaderContainerProps } from './HeaderContainer';
import { HeaderCellContentProps } from './HeaderCellContent';
import styles from './styles.less';

export interface HeaderProps {
  weekStartsOn: WeekdayIndex;
  locale: string;
  containerComponent: React.ComponentType<HeaderContainerProps>;
  cellContentComponent: React.ComponentType<HeaderCellContentProps>;
}

const Header = memo(
  ({ weekStartsOn, locale, containerComponent: ContainerComponent, cellContentComponent: CellContentComponent }: HeaderProps): JSX.Element => {
    const list = useMemo<HeaderCellType[]>(() => getHeaderWeekdays(weekStartsOn, locale), [weekStartsOn, locale]);

    return (
      <ContainerComponent>
        <ul className={styles.header__row}>
          {list.map(data => (
            <li key={data.id} className={styles.header__cell}>
              <CellContentComponent data={data} />
            </li>
          ))}
        </ul>
      </ContainerComponent>
    );
  },
);

export default Header;
