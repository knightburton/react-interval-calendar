import * as DEFAULT_PROPS from './default-props';

const DEFAULT_CONTEXT = <ContextType>{
  customClassNames: DEFAULT_PROPS.CUSTOM_CLASS_NAMES,
  enableSelect: DEFAULT_PROPS.ENABLE_SELECT,
  emptyLabel: DEFAULT_PROPS.EMPTY_LABEL,
  fadeWeekends: DEFAULT_PROPS.FADE_WEEKENDS,
  handleSelect: () => {},
  highlighted: DEFAULT_PROPS.HIGHLIGHTED,
  highlightedColorAlpha: DEFAULT_PROPS.HIGHLIGHTED_COLOR_ALPHA,
  locale: DEFAULT_PROPS.LOCALE,
  numberOfWeekPreRender: DEFAULT_PROPS.NUMBER_OF_WEEK_PRE_RENDER,
  numberOfWeeks: 0,
  showGutterBetweenHighlighted: DEFAULT_PROPS.SHOW_GUTTER_BETWEEN_HIGHLIGHTED,
  showHeaderWeekdays: DEFAULT_PROPS.SHOW_HEADER_WEEKDAYS,
  showMonthStripes: DEFAULT_PROPS.SHOW_MONTH_STRIPES,
  showMonths: DEFAULT_PROPS.SHOW_MONTHS,
  showToday: DEFAULT_PROPS.SHOW_TODAY,
  showYears: DEFAULT_PROPS.SHOW_YEARS,
  startDate: undefined,
  theme: DEFAULT_PROPS.THEME,
  updateVisibilityMatrix: undefined,
  visibilityMatrix: {},
  weekStartsOn: DEFAULT_PROPS.WEEK_STARTS_ON,
  weeksHeight: DEFAULT_PROPS.HEIGHT,
};

export default DEFAULT_CONTEXT;
