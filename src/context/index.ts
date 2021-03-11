import { createContext } from 'react';

import { NUMBER_OF_WEEK_PRE_RENDER } from '../constants/default-props';

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
  visibilityMatrix: {},
  updateVisibilityMatrix: () => {},
  numberOfWeekPreRender: NUMBER_OF_WEEK_PRE_RENDER,
});

export default Context;
