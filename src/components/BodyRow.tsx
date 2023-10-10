import React, { useMemo, useRef, useEffect } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { getCellAttributes } from '../helpers';
import { VisibilityMatrix, SlotRefComponentProps } from '../types';
import styles from './styles.less';
import classnames from '../utils/classnames';
import BodyCell, { BodyCellProps } from './BodyCell';
import { BodyCellContentProps } from './BodyCellContent';

export type BodyRowProps = SlotRefComponentProps<'ul', Record<string, unknown>>;

export type BodyRowPrivateProps = {
  numberOfWeek: number;
  numberOfTodayWeek: number;
  startRenderOnCurrentWeek: boolean;
  locale: string;
  numberOfRowsPreRender: number;
  startDate: Date | null;
  updateVisibilityMatrix?: (week: number) => void;
  visibilityMatrix: VisibilityMatrix;
  slots?: {
    root?: React.ElementType;
    cell?: React.ElementType;
    cellContent?: React.ElementType;
  };
  slotProps?: {
    root?: BodyRowProps;
    cell?: BodyCellProps;
    cellContent?: BodyCellContentProps;
  };
};

const BodyRow = ({
  numberOfWeek,
  numberOfTodayWeek,
  startRenderOnCurrentWeek,
  startDate,
  locale,
  visibilityMatrix,
  updateVisibilityMatrix,
  numberOfRowsPreRender,
  slots,
  slotProps,
}: BodyRowPrivateProps): JSX.Element => {
  const ref = useRef<HTMLUListElement>(null);
  const shouldScroll = useRef<boolean>(startRenderOnCurrentWeek && numberOfWeek === numberOfTodayWeek);
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
    const dates = Array.from(Array(7).keys()).map(day => getCellAttributes(startDate, numberOfWeek, day, locale));
    return dates;
  }, [startDate, numberOfWeek, locale, shouldRender]);
  const RootSlot = useMemo(() => slots?.root || 'ul', [slots]);
  const rootProps = useMemo(() => ({ ...(slotProps?.root || {}), className: classnames(styles.body__row, slotProps?.root?.className) }), [slotProps]);

  useEffect(() => {
    if (isVisible && !shouldRender && updateVisibilityMatrix) updateVisibilityMatrix(numberOfWeek);
  }, [isVisible, shouldRender, updateVisibilityMatrix, numberOfWeek]);

  useEffect(() => {
    if (ref.current && shouldScroll.current) ref.current.scrollIntoView();
  }, []);

  return (
    <RootSlot ref={ref} key={numberOfWeek} {...rootProps}>
      {data.map(cell => (
        <BodyCell
          key={cell.key}
          data={cell}
          locale={locale}
          slots={{ root: slots?.cell, content: slots?.cellContent }}
          slotProps={{ root: slotProps?.cell, content: slotProps?.cellContent }}
        />
      ))}
    </RootSlot>
  );
};

export default BodyRow;
