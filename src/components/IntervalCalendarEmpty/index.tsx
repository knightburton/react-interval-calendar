import React, { useContext } from 'react';

import Context from '../../context';
import styles from './styles.less';

const IntervalCalendarEmpty = (): JSX.Element => {
  const { weeksHeight, emptyLabel } = useContext(Context);

  return (
    <div
      className={styles.empty}
      style={{
        height: weeksHeight,
      }}
    >
      <p>{emptyLabel || 'There is no date range to display'}</p>
    </div>
  );
};

export default IntervalCalendarEmpty;
