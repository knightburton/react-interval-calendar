import React, { useCallback } from 'react';
import BodyCellContent, { BodyCellContentProps } from './BodyCellContent';
import { BodyCellType } from '../types';
import styles from './styles.less';

interface BodyCellProps {
  data: BodyCellType;
  locale?: string;
  onClick?: (cell: BodyCellType) => void;
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
