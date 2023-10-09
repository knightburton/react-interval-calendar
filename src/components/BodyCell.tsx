import React, { useCallback, useMemo } from 'react';
import { BodyCellType } from '../types';
import classnames from '../utils/classnames';
import styles from './styles.less';
import BodyCellContent, { BodyCellContentProps } from './BodyCellContent';

export type BodyCellProps = Omit<Partial<React.ComponentPropsWithRef<'li'>>, 'onClick'> & {
  onClick: (event: React.MouseEventHandler<HTMLLIElement>, data: BodyCellType) => void;
};

export type BodyCellPrivateProps = {
  data: BodyCellType;
  locale?: string;
  slots?: {
    root?: React.ElementType;
    content?: React.ElementType;
  };
  slotProps?: {
    root?: BodyCellProps;
    content?: Omit<BodyCellContentProps, 'data' | 'locale'>;
  };
};

const BodyCell = ({ data, locale, slots, slotProps }: BodyCellPrivateProps): JSX.Element => {
  const [RootSlot, ContentSlot] = useMemo(() => [slots?.root || 'li', slots?.content || BodyCellContent], [slots]);
  const { onClick, className, ...restRootProps } = slotProps?.root || {};
  const rootProps = useMemo(() => ({ ...restRootProps, className: classnames(styles.body__cell, className) }), [restRootProps, className]);
  const contentProps = useMemo(() => ({ ...(slotProps?.content || {}), className: classnames(styles.body__cell__content, slotProps?.content?.className) }), [slotProps]);

  const handleCellClick = useCallback(
    (event: React.MouseEventHandler<HTMLLIElement>) => {
      if (onClick) onClick(event, data);
    },
    [onClick, data],
  );

  return (
    <RootSlot {...rootProps} onClick={handleCellClick} role="presentation">
      <ContentSlot {...contentProps} data={data} locale={locale} />
    </RootSlot>
  );
};

export default BodyCell;
