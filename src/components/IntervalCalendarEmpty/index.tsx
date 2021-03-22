import React, { useContext, useMemo } from 'react';
import Context from '../../context';
import classnames from '../../utils/classnames';
import styles from './styles.less';

const IntervalCalendarEmpty = (): JSX.Element => {
  const { weeksHeight, emptyLabel, customClassNames } = useContext<ContextType>(Context);
  const className = useMemo(() => classnames(styles.empty, customClassNames?.calendarEmpty), [customClassNames.calendarEmpty]);

  return (
    <div
      className={className}
      style={{
        height: weeksHeight,
      }}
    >
      <p>{emptyLabel || 'There is no date range to display'}</p>
    </div>
  );
};

export default IntervalCalendarEmpty;
