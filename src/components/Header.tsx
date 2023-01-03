import React, { memo, useMemo } from 'react';
import { HeaderWeekday, WeekdayIndex } from '../types';
import { getHeaderWeekdays } from '../helpers';
import classnames from '../utils/classnames';
import styles from './styles.less';

interface HeaderProps {
  showHeaderWeekdays: boolean;
  weekStartsOn: WeekdayIndex;
  locale: string;
  className?: string;
  weekdaysClassName?: string;
  weekdayClassName?: string;
}

const Header = memo(
  ({ showHeaderWeekdays, weekStartsOn, locale, className = '', weekdaysClassName = '', weekdayClassName = '' }: HeaderProps): JSX.Element => {
    const weekdays = useMemo<HeaderWeekday[]>(() => (showHeaderWeekdays ? getHeaderWeekdays(weekStartsOn, locale) : []), [showHeaderWeekdays, weekStartsOn, locale]);

    return (
      <div className={classnames(styles.header, className)}>
        {showHeaderWeekdays && (
          <ul className={classnames(styles.header__weekdays, weekdaysClassName)}>
            {weekdays.map(weekday => (
              <li key={weekday.key} className={classnames(styles.header__weekday, weekdayClassName)}>
                {weekday.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

export default Header;
