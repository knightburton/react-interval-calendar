import { createContext } from 'react';

const Context = createContext<ContextType>({
  startDate: null,
  numberOfWeeks: 0,
  showWeekdays: true,
  weekStartsOn: 0,
  fadeWeekends: false,
});

export default Context;
