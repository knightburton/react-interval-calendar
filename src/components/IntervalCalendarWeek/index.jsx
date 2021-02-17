import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

import IntervalCalendarDay from '../IntervalCalendarDay';

import Context from '../../context';
import {
  addDays,
  addWeeks,
  getMonthEven,
  formatDate,
} from '../../utils/date';
import styles from './styles.less';

const IntervalCalendarWeek = ({ numberOfWeek }) => {
  // useContext hooks
  const { startDate } = useContext(Context);

  // useMemo hooks
  const data = useMemo(
    () => [...Array(7).keys()].map(day => {
      const date = addWeeks(addDays(startDate, day), numberOfWeek);

      return {
        key: `${numberOfWeek}-${day}`,
        date,
        display: formatDate(date),
        monthEven: getMonthEven(date),
      };
    }),
    [numberOfWeek, startDate],
  );

  return (
    <ul key={numberOfWeek} className={styles.week}>
      {data.map(day => (
        <IntervalCalendarDay
          key={day.key}
          day={day}
        />
      ))}
    </ul>
  );
};

IntervalCalendarWeek.propTypes = {
  numberOfWeek: PropTypes.number.isRequired,
};

export default IntervalCalendarWeek;
