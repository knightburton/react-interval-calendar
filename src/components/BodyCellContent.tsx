import React from 'react';
import { Cell } from '../types';
import { getBodyCellContentLabel } from '../helpers';

export interface BodyCellContentProps {
  data: Cell;
}

export interface BodyCellContentPrivateProps {
  data: Cell;
  locale?: string;
}

const BodyCellContent = ({ data, locale }: BodyCellContentPrivateProps): JSX.Element => <span>{getBodyCellContentLabel(data, locale)}</span>;

export default BodyCellContent;
