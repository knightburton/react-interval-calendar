import React, { memo } from 'react';
import { BodyCellData, SlotComponentProps } from '../types';
import { getBodyCellContent } from '../helpers';

export interface BodyCellContentPropsOverrides {}
export type BodyCellContentProps = SlotComponentProps<'div', BodyCellContentPropsOverrides, { data: BodyCellData; locale?: string }>;
export type BodyCellContentSlotProps = SlotComponentProps<'div', BodyCellContentPropsOverrides>;

const BodyCellContent = memo(({ data, locale, ...rest }: BodyCellContentProps): JSX.Element => <div {...rest}>{getBodyCellContent(data, locale)}</div>);

export default BodyCellContent;
