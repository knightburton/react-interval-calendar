import React, { useMemo } from 'react';
import classnames from '../utils/classnames';
import styles from './styles.less';

export interface EmptyProps {
  emptyLabel?: string;
  className?: string;
}

export interface EmptyPrivateProps extends EmptyProps {
  component?: React.ComponentType<EmptyProps>;
}

const Empty = ({ emptyLabel, className, component: Component }: EmptyPrivateProps): JSX.Element => {
  const classes = useMemo(() => classnames(styles.empty, className), [className]);

  if (Component) return <Component emptyLabel={emptyLabel} className={classes} />;
  return (
    <div className={classes}>
      <p>{emptyLabel || 'There is no date range to display'}</p>
    </div>
  );
};

export default Empty;
