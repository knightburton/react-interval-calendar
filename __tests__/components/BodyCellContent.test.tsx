import * as React from 'react';
import { render, screen } from '@testing-library/react';
import BodyCellContent from '../../src/components/BodyCellContent';
import { mockBodyCellAttributes } from '../testUtils';

const mockClassName = 'test-body-cell-content';
const defaultInlineSnapshot = `
<div>
  <div>
    18
  </div>
</div>
`;
const customerInlineSnapshot = `
<div>
  <div
    class="${mockClassName}"
  >
    18
  </div>
</div>
`;

describe('BodyCellContent', () => {
  test('shows the default BodyCellContent', () => {
    const { container } = render(<BodyCellContent data={mockBodyCellAttributes()} />);
    const text = screen.getByText('18');

    expect(text).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the BodyCellContent with custom locale and date', () => {
    render(<BodyCellContent data={mockBodyCellAttributes({ date: new Date(2023, 0, 1), isFirstDayOfYear: true })} locale="hu-HU" />);
    const text = screen.getByText('2023. jan. 01.');

    expect(text).toBeInTheDocument();
  });

  test('shows the BodyCellContent with custom className', () => {
    const { container } = render(<BodyCellContent data={mockBodyCellAttributes()} className={mockClassName} />);
    const text = screen.getByText('18');

    expect(text).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(customerInlineSnapshot);
  });
});
