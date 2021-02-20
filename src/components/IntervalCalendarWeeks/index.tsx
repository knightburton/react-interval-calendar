import React, { useContext } from 'react';

import IntervalCalendarWeek from '../IntervalCalendarWeek';

import Context from '../../context';
import styles from './styles.less';

const IntervalCalendarWeeks = () => {
  const { numberOfWeeks, weeksheight } = useContext(Context);

  return (
    <div className={styles.weeks} style={{ height: weeksheight }}>
      {Array.from(Array(numberOfWeeks + 1).keys()).map(numberOfWeek => (
        <IntervalCalendarWeek
          key={numberOfWeek}
          numberOfWeek={numberOfWeek}
        />
      ))}
    </div>
  );
};

export default IntervalCalendarWeeks;
