import React, { memo } from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';

export type ContainerProps = {
  className?: string;
  height?: number | '100%' | 'auto';
  children?: React.ReactNode;
};

export type ContainerPrivateProps = ContainerProps & {
  slot?: React.ElementType<ContainerProps>;
  slotProps?: Omit<ContainerProps, 'children'>;
};

const Container = memo(
  ({ children, slot, slotProps }: ContainerPrivateProps): JSX.Element => {
    const containerClassName = classnames(styles.calendar, slotProps?.className);
    const ContainerSlot = slot || 'div';
    const containerProps = { className: containerClassName, style: { height: slotProps?.height }, ...slotProps };

    return <ContainerSlot {...containerProps}>{children}</ContainerSlot>;
  },
);

export default Container;
