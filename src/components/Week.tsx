import React, { memo, useMemo, useRef, useEffect } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { getDayAttributes } from '../helpers';
import { HighlightedItem, ThemeOption, VisibilityMatrix } from '../types';
import { DayInterface } from './Day';
import classnames from '../utils/classnames';
import styles from './styles.less';

interface WeekProps {
  numberOfWeek: number;
  highlighted: HighlightedItem[];
  highlightedColorAlpha: number;
  locale: string;
  numberOfWeekPreRender: number;
  startDate: Date | null;
  theme: ThemeOption;
  updateVisibilityMatrix?: (week: number) => void;
  visibilityMatrix: VisibilityMatrix;
  renderDay: (day: DayInterface) => JSX.Element;
  className?: string;
}

const Week = memo(
  ({
    numberOfWeek,
    startDate,
    highlighted,
    highlightedColorAlpha,
    locale,
    visibilityMatrix,
    updateVisibilityMatrix,
    numberOfWeekPreRender,
    theme,
    renderDay,
    className = '',
  }: WeekProps): JSX.Element => {
    const ref = useRef(null);
    const isVisible = useOnScreen(ref);
    const shouldRender = useMemo(
      () =>
        visibilityMatrix[numberOfWeek] ||
        Array(numberOfWeekPreRender)
          .fill(null)
          .some((_, idx) => visibilityMatrix[numberOfWeek - idx]),
      [visibilityMatrix, numberOfWeek, numberOfWeekPreRender],
    );
    const data = useMemo(() => {
      if (!startDate || !shouldRender) return [];
      return Array.from(Array(7).keys()).map(day => getDayAttributes(startDate, numberOfWeek, day, highlighted, highlightedColorAlpha, theme, locale));
    }, [startDate, numberOfWeek, highlighted, highlightedColorAlpha, locale, shouldRender, theme]);

    useEffect(() => {
      if (isVisible && !shouldRender && updateVisibilityMatrix) updateVisibilityMatrix(numberOfWeek);
    }, [isVisible, shouldRender, updateVisibilityMatrix, numberOfWeek]);

    return (
      <ul ref={ref} key={numberOfWeek} className={classnames(styles.week, className)}>
        {data.map(day => renderDay(day))}
      </ul>
    );
  },
);

export default Week;
