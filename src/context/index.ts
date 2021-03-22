import { createContext } from 'react';

import * as DEFAULT_PROPS from '../constants/default-props';

const Context = createContext<ContextType>({
  startDate: undefined,
  numberOfWeeks: 0,
  theme: DEFAULT_PROPS.THEME,
  showToday: DEFAULT_PROPS.SHOW_TODAY,
  showHeaderWeekdays: DEFAULT_PROPS.SHOW_HEADER_WEEKDAYS,
  showMonths: DEFAULT_PROPS.SHOW_MONTHS,
  showYears: DEFAULT_PROPS.SHOW_YEARS,
  showGutterBetweenHighlighted: DEFAULT_PROPS.SHOW_GUTTER_BETWEEN_HIGHLIGHTED,
  showMonthStripes: DEFAULT_PROPS.SHOW_MONTH_STRIPES,
  weekStartsOn: DEFAULT_PROPS.WEEK_STARTS_ON,
  fadeWeekends: DEFAULT_PROPS.FADE_WEEKENDS,
  weeksHeight: DEFAULT_PROPS.HEIGHT,
  highlighted: DEFAULT_PROPS.HIGHLIGHTED,
  highlightedColorAlpha: DEFAULT_PROPS.HIGHLIGHTED_COLOR_ALPHA,
  locale: DEFAULT_PROPS.LOCALE,
  emptyLabel: DEFAULT_PROPS.EMPTY_LABEL,
  handleSelect: undefined,
  visibilityMatrix: {},
  updateVisibilityMatrix: () => {},
  numberOfWeekPreRender: DEFAULT_PROPS.NUMBER_OF_WEEK_PRE_RENDER,
  customClassNames: DEFAULT_PROPS.CUSTOM_CLASS_NAMES,
});

export default Context;
