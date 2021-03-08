import { createContext } from 'react';

const Context = createContext<ContextType>({
  startDate: undefined,
  numberOfWeeks: 0,
  showToday: true,
  showWeekdays: true,
  showMonths: false,
  showYears: false,
  showGutterBetweenHighlighted: false,
  weekStartsOn: 0,
  fadeWeekends: false,
  weeksHeight: 500,
  highlighted: [],
  locale: 'default',
  emptyLabel: '',
  handleSelect: undefined,
});

export default Context;
