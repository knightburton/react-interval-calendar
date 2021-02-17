import React, { useContext } from 'react';

import IntervalCalendarWeek from '../IntervalCalendarWeek';

import Context from '../../context';

const IntervalCalendarWeeks = () => {
  const { numberOfWeeks } = useContext(Context);

  return (
    <div>
      {[...Array(numberOfWeeks + 1).keys()].map(numberOfWeek => (
        <IntervalCalendarWeek
          key={numberOfWeek}
          numberOfWeek={numberOfWeek}
        />
      ))}
    </div>
  );
};

export default IntervalCalendarWeeks;
