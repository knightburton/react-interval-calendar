import React, { useContext, useMemo } from 'react';

import Context from '../../context';
import classnames from '../../utils/classnames';
import { getHeaderWeekdays } from '../../helpers';
import styles from './styles.less';

const IntervalCalendarHeader = (): JSX.Element => {
  // useContext hooks
  const { showHeaderWeekdays, weekStartsOn, locale, customClassNames } = useContext<ContextType>(Context);

  // useMemo hooks
  const weekdays = useMemo<HeaderWeekday[]>(() => (showHeaderWeekdays ? getHeaderWeekdays(weekStartsOn, locale) : []), [showHeaderWeekdays, weekStartsOn, locale]);
  const headerClassName = useMemo<string>(() => classnames(styles.header, customClassNames.header), [customClassNames.header]);
  const headerDayClassName = useMemo<string>(() => classnames(styles.header__day, customClassNames.headerDay), [customClassNames.headerDay]);

  return (
    <div className={headerClassName}>
      {showHeaderWeekdays &&
        weekdays.map(weekday => (
          <div key={weekday.key} className={headerDayClassName}>
            {weekday.label}
          </div>
        ))}
    </div>
  );
};

export default IntervalCalendarHeader;
