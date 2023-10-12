import React, { memo } from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';
import { SlotComponentProps } from '../types';

export type EmptyProps = SlotComponentProps<'div', { label?: string }>;

export type EmptyPrivateProps = {
  slots?: {
    root?: React.ElementType;
  };
  slotProps?: {
    root?: EmptyProps;
  };
};

const Empty = memo(({ slots, slotProps }: EmptyPrivateProps): JSX.Element => {
  const rootClassName = classnames(styles.empty, slotProps?.root?.className);
  const { label = 'There is no date range to display', ...restProps } = slotProps?.root || {};
  const rootProps = { ...restProps, ...(slots?.root ? { label } : {}), className: rootClassName };
  const RootSlot = slots?.root || 'div';

  return (
    <RootSlot {...rootProps}>
      <p>{label}</p>
    </RootSlot>
  );
});

export default Empty;
