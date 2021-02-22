import { createContext } from 'react';

const Context = createContext<ContextType>({
  startDate: undefined,
  numberOfWeeks: 0,
  showWeekdays: true,
  showMonths: false,
  showYears: false,
  weekStartsOn: 0,
  fadeWeekends: false,
  weeksHeight: 500,
  highlighted: [],
});

export default Context;
