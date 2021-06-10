import React, { useContext, useMemo } from 'react';
import Context from '../../context';
import classnames from '../../utils/classnames';
import { ContextType, HeaderWeekday } from '../../types';
import { getHeaderWeekdays } from '../../helpers';
import styles from './styles.less';

const IntervalCalendarHeader = (): JSX.Element => {
  // useContext hooks
  const { showHeaderWeekdays, weekStartsOn, locale, customClassNames } = useContext<ContextType>(Context);

  // useMemo hooks
  const weekdays = useMemo<HeaderWeekday[]>(() => (showHeaderWeekdays ? getHeaderWeekdays(weekStartsOn, locale) : []), [showHeaderWeekdays, weekStartsOn, locale]);
  const headerClassName = useMemo<string>(() => classnames(styles.header, customClassNames.header), [customClassNames.header]);
  const headerWeekdaysClassName = useMemo<string>(() => classnames(styles.header__weekdays, customClassNames.headerWeekdays), [customClassNames.headerWeekdays]);
  const headerWeekdayClassName = useMemo<string>(() => classnames(styles.header__weekday, customClassNames.headerWeekday), [customClassNames.headerWeekday]);

  return (
    <div className={headerClassName}>
      {showHeaderWeekdays && (
        <ul className={headerWeekdaysClassName}>
          {weekdays.map(weekday => (
            <li key={weekday.key} className={headerWeekdayClassName}>
              {weekday.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IntervalCalendarHeader;
