import { createContext } from 'react';

const Context = createContext({
  showWeekdays: true,
  weekStartsOn: 0,
});

export default Context;
