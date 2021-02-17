import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

import Context from '../../context';
import {
  getDate,
  addDays,
  addWeeks,
} from '../../utils/date';

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
        display: getDate(date),
      };
    }),
    [numberOfWeek, startDate],
  );

  return (
    <div key={numberOfWeek}>
      {data.map(day => (
        <span key={day.key}>
          {`::${day.display}::`}
        </span>
      ))}
    </div>
  );
};

IntervalCalendarWeek.propTypes = {
  numberOfWeek: PropTypes.number.isRequired,
};

export default IntervalCalendarWeek;
