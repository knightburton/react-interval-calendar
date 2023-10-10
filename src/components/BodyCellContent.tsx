import React from 'react';
import { BodyCellData, SlotComponentProps } from '../types';
import { getBodyCellContent } from '../helpers';

export type BodyCellContentProps = SlotComponentProps<'div', { data: BodyCellData; locale?: string }>;

const BodyCellContent = ({ data, locale, ...rest }: BodyCellContentProps): JSX.Element => <div {...rest}>{getBodyCellContent(data, locale)}</div>;

export default BodyCellContent;
