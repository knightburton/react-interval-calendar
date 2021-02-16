import { createContext } from 'react';

const Context = createContext({
  numberOfWeeks: 0,
  showWeekdays: true,
  weekStartsOn: 0,
});

export default Context;
