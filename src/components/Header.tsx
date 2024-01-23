import React, { memo, useMemo } from 'react';
import { HeaderCellData, WeekdayIndex, SlotComponentProps } from '../types';
import { getHeaderWeekdays } from '../helpers';
import classnames from '../utils/classnames';
import styles from './styles.less';

// Header
export interface HeaderPropsOverrides {}
export type HeaderProps = SlotComponentProps<'ul', HeaderPropsOverrides, { disabled?: boolean }>;
export type HeaderSlotProps = HeaderProps;

// Header Cell
export interface HeaderCellPropsOverrides {}
export type HeaderCellProps = SlotComponentProps<'li', HeaderCellPropsOverrides>;
export type HeaderCellSlotProps = HeaderCellProps;

// Header Cell Content
export interface HeaderCellContentPropsOverrides {}
export type HeaderCellContentProps = SlotComponentProps<'div', HeaderCellContentPropsOverrides, { data: HeaderCellData }>;
export type HeaderCellContentSlotProps = SlotComponentProps<'div', HeaderCellContentPropsOverrides>;

export type HeaderPrivateProps = {
  weekStartsOn?: WeekdayIndex;
  locale?: string;
  slots?: {
    root?: React.ElementType;
    cell?: React.ElementType;
    cellContent?: React.ElementType;
  };
  slotProps?: {
    root?: HeaderSlotProps;
    cell?: HeaderCellSlotProps;
    cellContent?: HeaderCellContentSlotProps;
  };
};

const HeaderCellContent = memo(({ data, ...rest }: HeaderCellContentProps): JSX.Element => <div {...rest}>{data.short}</div>);

const Header = memo(({ weekStartsOn, locale, slots, slotProps }: HeaderPrivateProps): JSX.Element | null => {
  const list = useMemo<HeaderCellData[]>(() => getHeaderWeekdays(weekStartsOn, locale), [weekStartsOn, locale]);
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
