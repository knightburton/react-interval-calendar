import React, { memo } from 'react';
import { BodyCellData, SlotComponentProps } from '../types';
import { getBodyCellContent } from '../helpers';

export type BodyCellContentProps = SlotComponentProps<'div', { data: BodyCellData; locale?: string }>;

const BodyCellContent = memo(({ data, locale, ...rest }: BodyCellContentProps): JSX.Element => <div {...rest}>{getBodyCellContent(data, locale)}</div>);

export default BodyCellContent;
