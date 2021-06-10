import React, { useContext, useMemo } from 'react';
import { ContextType } from '../../types';
import IntervalCalendarWeek from '../IntervalCalendarWeek';
import classnames from '../../utils/classnames';
import Context from '../../context';
import styles from './styles.less';

const IntervalCalendarWeeks = (): JSX.Element => {
  // useContext hooks
  const { startDate, numberOfWeeks, weeksHeight, customClassNames } = useContext<ContextType>(Context);

  // useMemo hooks
  const className = useMemo(() => classnames(styles.weeks, customClassNames.weeks), [customClassNames.weeks]);

  return (
    <div className={className} style={{ height: weeksHeight }}>
      {!!startDate && Array.from(Array(numberOfWeeks + 1).keys()).map(numberOfWeek => <IntervalCalendarWeek key={numberOfWeek} numberOfWeek={numberOfWeek} />)}
    </div>
  );
};

export default IntervalCalendarWeeks;
