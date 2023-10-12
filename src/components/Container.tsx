import React, { memo } from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';
import { SlotComponentProps } from '../types';

export type ContainerProps = SlotComponentProps<'div', Record<string, unknown>>;

export type ContainerPrivateProps = {
  slots?: {
    root?: React.ElementType;
  };
  slotProps?: {
    root?: ContainerProps;
  };
  children?: React.ReactNode;
};

const Container = memo(
  ({ children, slots, slotProps }: ContainerPrivateProps): JSX.Element => {
    const containerProps = { ...(slotProps?.root || {}), className: classnames(styles.calendar, slotProps?.root?.className) };
    const ContainerSlot = slots?.root || 'div';

    return <ContainerSlot {...containerProps}>{children}</ContainerSlot>;
  },
);

export default Container;
