import React from 'react';
import { SlotComponentProps, VisibilityMatrix } from '../types';
import classnames from '../utils/classnames';
import styles from './styles.less';
import BodyRow, { BodyRowProps } from './BodyRow';
import { BodyCellProps } from './BodyCell';
import { BodyCellContentProps } from './BodyCellContent';

export type BodyProps = SlotComponentProps<'div', Record<string, unknown>>;

export type BodyPrivateProps = {
  numberOfWeeks: number;
  numberOfTodayWeek: number;
  startRenderOnCurrentWeek: boolean;
  locale: string;
  numberOfRowsPreRender: number;
  startDate: Date | null;
  updateVisibilityMatrix?: (week: number) => void;
  visibilityMatrix: VisibilityMatrix;
  slots?: {
    root?: React.ElementType;
    row?: React.ElementType;
    cell?: React.ElementType;
    cellContent?: React.ElementType;
  };
  slotProps?: {
    root?: BodyProps;
    row?: BodyRowProps;
    cell?: BodyCellProps;
    cellContent?: BodyCellContentProps;
  };
};

const Body = ({
  numberOfWeeks,
  numberOfTodayWeek,
  startRenderOnCurrentWeek,
  locale,
  numberOfRowsPreRender,
  startDate,
  updateVisibilityMatrix,
  visibilityMatrix,
  slots,
  slotProps,
}: BodyPrivateProps): JSX.Element => {
  const RootSlot = slots?.root || 'div';
  const rootProps = { ...(slotProps?.root || {}), className: classnames(styles.body, slotProps?.root?.className) };

  return (
    <RootSlot {...rootProps}>
      {!!startDate &&
        Array.from(Array(numberOfWeeks + 1).keys()).map(numberOfWeek => (
          <BodyRow
            key={numberOfWeek}
            numberOfWeek={numberOfWeek}
            numberOfTodayWeek={numberOfTodayWeek}
            startRenderOnCurrentWeek={startRenderOnCurrentWeek}
            locale={locale}
            numberOfRowsPreRender={numberOfRowsPreRender}
            startDate={startDate}
            updateVisibilityMatrix={updateVisibilityMatrix}
            visibilityMatrix={visibilityMatrix}
            slots={{
              root: slots?.row,
              cell: slots?.cell,
              cellContent: slots?.cellContent,
            }}
            slotProps={{
              root: slotProps?.row,
              cell: slotProps?.cell,
              cellContent: slotProps?.cellContent,
            }}
          />
        ))}
    </RootSlot>
  );
};

export default Body;
