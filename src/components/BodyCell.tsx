import React, { useCallback } from 'react';
import BodyCellContent, { BodyCellContentProps } from './BodyCellContent';
import { Cell } from '../types';
import styles from './styles.less';

interface BodyCellProps {
  data: Cell;
  locale?: string;
  onClick?: (cell: Cell) => void;
  contentComponent?: React.ComponentType<BodyCellContentProps>;
}

const BodyCell = ({ data, locale, contentComponent: ContentComponent, onClick }: BodyCellProps): JSX.Element => {
  const handleClick = useCallback(() => {
    if (onClick) onClick(data);
  }, [onClick, data]);

  return (
    <li className={styles.day} onClick={(!!onClick && handleClick) || undefined} role="presentation">
      {ContentComponent ? <ContentComponent data={data} /> : <BodyCellContent data={data} locale={locale} />}
    </li>
  );
};

export default BodyCell;
