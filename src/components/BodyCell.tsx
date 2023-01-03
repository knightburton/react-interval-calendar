import React, { useCallback } from 'react';
import styles from './styles.less';

export interface CellInterface {
  key: string;
  date: Date;
  day: string;
  month: string;
  year: string;
  isFirstDayOfYear: boolean;
  isMonthEven: boolean;
  isFirstDayOfMonth: boolean;
  isLastDayOfMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

interface BodyCellProps {
  data: CellInterface;
  formatter: (cell: CellInterface) => string;
  onClick?: (cell: CellInterface) => void;
}

const BodyCell = ({ data, formatter, onClick }: BodyCellProps): JSX.Element => {
  const handleClick = useCallback(() => {
    if (onClick) onClick(data);
  }, [onClick, data]);

  return (
    <li className={styles.day} onClick={(!!onClick && handleClick) || undefined} role="presentation">
      {formatter(data)}
    </li>
  );
};

export default BodyCell;
