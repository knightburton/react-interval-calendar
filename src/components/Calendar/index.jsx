import React, { useMemo } from 'react';

import CalendarContext from '../../context';

const Calendar = () => {
  // use memo hooks
  const contextValue = useMemo(() => ({}), []);

  return (
    <CalendarContext.Provider value={contextValue}>
      <div>
        <p>Calendar</p>
      </div>
    </CalendarContext.Provider>
  );
};

export default Calendar;
