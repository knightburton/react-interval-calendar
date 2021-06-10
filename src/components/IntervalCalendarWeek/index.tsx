import React, { useContext, useMemo, useRef, useEffect } from 'react';
import classnames from '../../utils/classnames';
import Context from '../../context';
import useOnScreen from '../../hooks/useOnScreen';
import { getDayAttributes } from '../../helpers';
import { ContextType } from '../../types';
import { IntervalCalendarWeekProps } from '../../interfaces/IntervalCalendarWeek.interface';
import IntervalCalendarDay from '../IntervalCalendarDay';
import styles from './styles.less';

const IntervalCalendarWeek = ({ numberOfWeek }: IntervalCalendarWeekProps): JSX.Element => {
  // General hooks
  const {
    startDate,
    highlighted,
    highlightedColorAlpha,
    locale,
    visibilityMatrix,
    updateVisibilityMatrix,
    numberOfWeekPreRender,
    customClassNames,
    theme,
  } = useContext<ContextType>(Context);
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  // useMemo hooks
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

  const className = useMemo(() => classnames(styles.week, customClassNames.week), [customClassNames.week]);

  // useEffect hooks
  useEffect(() => {
    if (isVisible && !shouldRender && updateVisibilityMatrix) updateVisibilityMatrix(numberOfWeek);
  }, [isVisible, shouldRender, updateVisibilityMatrix, numberOfWeek]);

  return (
    <ul ref={ref} key={numberOfWeek} className={className}>
      {data.map(day => (
        <IntervalCalendarDay key={day.key} day={day} />
      ))}
    </ul>
  );
};

export default IntervalCalendarWeek;
