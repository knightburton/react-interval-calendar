import * as React from 'react';
import { render, screen } from '@testing-library/react';
import BodyCellContent, { BodyCellContentProps } from '../../src/components/BodyCellContent';
import { mockBodyCellAttributes } from '../testUtils';

const mockComponent = ({ data, className }: BodyCellContentProps): JSX.Element => <p className={className}>{data.day}</p>;
const mockClassName = 'test-body-cell-content';
const defaultInlineSnapshot = `
<span
  class="body__cell__content"
>
  18
</span>
`;
const customerInlineSnapshot = `
<p
  class="body__cell__content ${mockClassName}"
>
  18
</p>
`;

describe('BodyCellContent', () => {
  test('shows the default BodyCellContent', () => {
    const { asFragment } = render(<BodyCellContent data={mockBodyCellAttributes()} />);
    const text = screen.getByText('18');

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the BodyCellContent with custom locale and date', () => {
    render(<BodyCellContent data={mockBodyCellAttributes({ date: new Date(2023, 0, 1), isFirstDayOfYear: true })} locale="hu-HU" />);
    const text = screen.getByText('2023. jan. 01.');

    expect(text).toBeTruthy();
  });

  test('shows the BodyCellContent with custom component and className', () => {
    const { asFragment } = render(<BodyCellContent data={mockBodyCellAttributes()} component={mockComponent} className={mockClassName} />);
    const text = screen.getByText('18');

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(customerInlineSnapshot);
  });
});
