import { createContext } from 'react';

import * as DEFAULT_PROPS from '../constants/default-props';

const Context = createContext<ContextType>({
  startDate: undefined,
  numberOfWeeks: 0,
  showToday: DEFAULT_PROPS.SHOW_TODAY,
  showWeekdays: DEFAULT_PROPS.SHOW_WEEKDAYS,
  showMonths: DEFAULT_PROPS.SHOW_MONTHS,
  showYears: DEFAULT_PROPS.SHOW_YEARS,
  showGutterBetweenHighlighted: DEFAULT_PROPS.SHOW_GUTTER_BETWEEN_HIGHLIGHTED,
  showMonthStripes: DEFAULT_PROPS.SHOW_MONTH_STRIPES,
  weekStartsOn: DEFAULT_PROPS.WEEK_STARTS_ON,
  fadeWeekends: DEFAULT_PROPS.FADE_WEEKENDS,
  weeksHeight: DEFAULT_PROPS.HEIGHT,
  highlighted: DEFAULT_PROPS.HIGHLIGHTED,
  locale: DEFAULT_PROPS.LOCALE,
  emptyLabel: DEFAULT_PROPS.EMPTY_LABEL,
  handleSelect: undefined,
  visibilityMatrix: {},
  updateVisibilityMatrix: () => {},
  numberOfWeekPreRender: DEFAULT_PROPS.NUMBER_OF_WEEK_PRE_RENDER,
});

export default Context;
