import React, { useContext } from 'react';

import IntervalCalendarWeek from '../IntervalCalendarWeek';

import Context from '../../context';

const IntervalCalendarWeeks = () => {
  const { numberOfWeeks } = useContext(Context);

  return (
    <div>
      {Array.from({ length: numberOfWeeks + 1 }, (_, i) => i).map(numberOfWeek => (
        <IntervalCalendarWeek
          key={numberOfWeek}
          numberOfWeek={numberOfWeek}
        />
      ))}
    </div>
  );
};

export default IntervalCalendarWeeks;
