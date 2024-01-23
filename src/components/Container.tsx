import React, { memo } from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';
import { SlotComponentProps } from '../types';

export interface ContainerPropsOverrides {}
export type ContainerProps = SlotComponentProps<'div', ContainerPropsOverrides>;
export type ContainerSlotProps = ContainerProps;

export type ContainerPrivateProps = {
  slots?: {
    root?: React.ElementType;
  };
  slotProps?: {
    root?: ContainerSlotProps;
  };
  children?: React.ReactNode;
};

const Container = memo(({ children, slots, slotProps }: ContainerPrivateProps): JSX.Element => {
  const containerProps = { ...(slotProps?.root || {}), className: classnames(styles.calendar, slotProps?.root?.className) };
  const ContainerSlot = slots?.root || 'div';

  return <ContainerSlot {...containerProps}>{children}</ContainerSlot>;
});

export default Container;
