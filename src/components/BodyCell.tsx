import React, { useCallback, useMemo, memo } from 'react';
import { BodyCellData } from '../types';
import classnames from '../utils/classnames';
import styles from './styles.less';
import BodyCellContent, { BodyCellContentProps } from './BodyCellContent';

export type BodyCellProps = Omit<Partial<React.ComponentPropsWithRef<'li'>>, 'onClick'> & {
  onClick: (event: React.MouseEvent<HTMLLIElement>, data: BodyCellData) => void;
};

export type BodyCellPrivateProps = {
  data: BodyCellData;
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

const BodyCell = memo(({ data, locale, slots, slotProps }: BodyCellPrivateProps): JSX.Element => {
  const [RootSlot, ContentSlot] = useMemo(() => [slots?.root || 'li', slots?.content || BodyCellContent], [slots]);
  const { onClick, className, ...restRootProps } = slotProps?.root || {};
  const rootProps = useMemo(() => ({ ...restRootProps, className: classnames(styles.body__cell, className) }), [restRootProps, className]);
  const contentProps = useMemo(() => ({ ...(slotProps?.content || {}), className: classnames(styles.body__cell__content, slotProps?.content?.className) }), [slotProps]);

  const handleCellClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      if (onClick) onClick(event, data);
    },
    [onClick, data],
  );

  return (
    <RootSlot {...rootProps} onClick={(!!onClick && handleCellClick) || undefined} role="presentation">
      <ContentSlot {...contentProps} data={data} locale={locale} />
    </RootSlot>
  );
});

export default BodyCell;
