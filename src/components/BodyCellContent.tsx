import React from 'react';
import { BodyCellType } from '../types';
import { getBodyCellContent } from '../helpers';

export interface BodyCellContentProps {
  data: BodyCellType;
}

export interface BodyCellContentPrivateProps {
  data: BodyCellType;
  locale?: string;
}

const BodyCellContent = ({ data, locale }: BodyCellContentPrivateProps): JSX.Element => <span>{getBodyCellContent(data, locale)}</span>;

export default BodyCellContent;
