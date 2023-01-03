import React, { memo, useMemo } from 'react';
import { HeaderCell as HeaderCellType, WeekdayIndex } from '../types';
import { getHeaderWeekdays } from '../helpers';
import { HeaderContainerProps } from './HeaderContainer';
import styles from './styles.less';

export interface HeaderProps {
  weekStartsOn: WeekdayIndex;
  locale: string;
  containerComponent: React.ComponentType<HeaderContainerProps>;
}

const Header = memo(
  ({ weekStartsOn, locale, containerComponent: ContainerComponent }: HeaderProps): JSX.Element => {
    const weekdays = useMemo<HeaderCellType[]>(() => getHeaderWeekdays(weekStartsOn, locale), [weekStartsOn, locale]);

    return (
      <ContainerComponent>
        <ul className={styles.header__row}>
          {weekdays.map(weekday => (
            <li key={weekday.key} className={styles.header__cell}>
              {weekday.label}
            </li>
          ))}
        </ul>
      </ContainerComponent>
    );
  },
);

export default Header;
