import { createContext } from 'react';

const Context = createContext<ContextType>({
  startDate: undefined,
  numberOfWeeks: 0,
  showWeekdays: true,
  weekStartsOn: 0,
  fadeWeekends: false,
});

export default Context;
