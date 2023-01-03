import React, { memo } from 'react';
import { ThemeOption } from '../types';
import classnames from '../utils/classnames';
import styles from './styles.less';

interface WrapperProps {
  theme: ThemeOption;
  showBorder: boolean;
  showBorderRadius: boolean;
  height: number | '100%' | 'auto';
  className?: string;
}

const Wrapper = memo(
  ({ theme, showBorder, showBorderRadius, height, className = '', children }: React.PropsWithChildren<WrapperProps>): JSX.Element => {
    return (
      <div
        data-theme={theme}
        className={classnames(
          styles.calendar,
          {
            [styles.calendar__border]: showBorder,
            [styles.calendar__border__radius]: showBorder && showBorderRadius,
          },
          className,
        )}
        style={{
          height,
        }}
      >
        {children}
      </div>
    );
  },
);

export default Wrapper;
