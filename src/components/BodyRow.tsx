import React, { useMemo, useRef, useEffect } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { getCellAttributes } from '../helpers';
import { VisibilityMatrix, BodyCellType } from '../types';
import styles from './styles.less';
import classnames from '../utils/classnames';

interface BodyRowProps {
  numberOfWeek: number;
  locale: string;
  numberOfRowsPreRender: number;
  startDate: Date | null;
  updateVisibilityMatrix?: (week: number) => void;
  visibilityMatrix: VisibilityMatrix;
  renderCell: (cell: BodyCellType) => JSX.Element;
  className?: string;
}

const BodyRow = ({
  numberOfWeek,
  startDate,
  locale,
  visibilityMatrix,
  updateVisibilityMatrix,
  numberOfRowsPreRender,
  renderCell,
  className,
}: BodyRowProps): JSX.Element => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  const shouldRender = useMemo(
    () =>
      visibilityMatrix[numberOfWeek] ||
      Array(numberOfRowsPreRender)
        .fill(null)
        .some((_, idx) => visibilityMatrix[numberOfWeek - idx]),
    [visibilityMatrix, numberOfWeek, numberOfRowsPreRender],
  );
  const data = useMemo(() => {
    if (!startDate || !shouldRender) return [];
    return Array.from(Array(7).keys()).map(day => getCellAttributes(startDate, numberOfWeek, day, locale));
  }, [startDate, numberOfWeek, locale, shouldRender]);
  const classes = useMemo(() => classnames(styles.body__row, className), [className]);

  useEffect(() => {
    if (isVisible && !shouldRender && updateVisibilityMatrix) updateVisibilityMatrix(numberOfWeek);
  }, [isVisible, shouldRender, updateVisibilityMatrix, numberOfWeek]);

  return (
    <ul ref={ref} key={numberOfWeek} className={classes}>
      {data.map(cell => renderCell(cell))}
    </ul>
  );
};

export default BodyRow;
