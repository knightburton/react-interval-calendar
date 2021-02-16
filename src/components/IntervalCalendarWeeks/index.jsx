import React, { useContext } from 'react';

import Context from '../../context';

const IntervalCalendarWeeks = () => {
  const { numberOfWeeks } = useContext(Context);

  return (
    <div>
      {[...Array(numberOfWeeks + 1).keys()].map(numberOfWeek => (
        <p key={numberOfWeek}>
          {`${numberOfWeek}. week`}
        </p>
      ))}
    </div>
  );
};

export default IntervalCalendarWeeks;
