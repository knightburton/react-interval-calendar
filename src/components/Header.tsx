import React, { memo, useMemo } from 'react';
import { HeaderCellType, WeekdayIndex, SlotComponentProps } from '../types';
import { getHeaderWeekdays } from '../helpers';
import classnames from '../utils/classnames';
import styles from './styles.less';

export type HeaderProps = SlotComponentProps<'ul', { disabled?: boolean }>;
export type HeaderCellProps = SlotComponentProps<'li', Record<string, unknown>>;
export type HeaderCellContentProps = SlotComponentProps<'div', { data: HeaderCellType }>;

export type HeaderPrivateProps = {
  weekStartsOn?: WeekdayIndex;
  locale?: string;
  slots?: {
    root?: React.ElementType;
    cell?: React.ElementType;
    cellContent?: React.ElementType;
  };
  slotProps?: {
    root?: HeaderProps;
    cell?: HeaderCellProps;
    cellContent?: Omit<HeaderCellContentProps, 'data'>;
  };
};

const HeaderCellContent = memo(({ data, ...rest }: HeaderCellContentProps): JSX.Element => <div {...rest}>{data.short}</div>);

const Header = memo(({ weekStartsOn, locale, slots, slotProps }: HeaderPrivateProps): JSX.Element | null => {
  const list = useMemo<HeaderCellType[]>(() => getHeaderWeekdays(weekStartsOn, locale), [weekStartsOn, locale]);
  const RootSlot = slots?.root || 'ul';
  const CellSlot = slots?.cell || 'li';
  const CellContentSlot = slots?.cellContent || HeaderCellContent;
  const { disabled, ...rootSlotProps } = slotProps?.root || {};
  const rootProps = { ...rootSlotProps, className: classnames(styles.header, slotProps?.root?.className) };
  const cellProps = { ...(slotProps?.cell || {}), className: classnames(styles.header__cell, slotProps?.cell?.className) };
  const cellContentProps = { ...(slotProps?.cellContent || {}), className: classnames(styles.header__cell__content, slotProps?.cellContent?.className) };

  if (disabled) return null;
  return (
    <RootSlot {...rootProps}>
      {list.map(data => (
        <CellSlot key={data.key} {...cellProps}>
          <CellContentSlot data={data} {...cellContentProps} />
        </CellSlot>
      ))}
    </RootSlot>
  );
});

export default Header;
