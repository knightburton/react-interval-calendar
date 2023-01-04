import React, { memo } from 'react';
import { HeaderCellType } from '../types';

export interface HeaderCellContentProps {
  data: HeaderCellType;
}

const HeaderCellContent = memo(({ data }: HeaderCellContentProps): JSX.Element => <span>{data.short}</span>);

export default HeaderCellContent;
