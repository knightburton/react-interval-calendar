import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Empty, { EmptyProps } from '../../src/components/Empty';

const defaultLabel = 'There is no date range to display';
const mockLabel = 'Hey! Get over here!';
const mockLabel2 = 'Mocking you!';
const mockClassName = 'test-empty';
const mockComponent = ({ className, emptyLabel }: EmptyProps) => <p className={className}>{emptyLabel}</p>;
const defaultInlineSnaphsot = `
<div
  class="empty"
>
  <p>
    ${defaultLabel}
  </p>
</div>
`;
const labelInlineSnapshot = `
<div
  class="empty"
>
  <p>
    ${mockLabel}
  </p>
</div>
`;
const classNameInlineSnapshot = `
<div
  class="empty ${mockClassName}"
>
  <p>
    ${mockLabel}
  </p>
</div>
`;
const customInlineSnapshot = `
<p
  class="empty ${mockClassName}"
>
  ${mockLabel2}
</p>
`;

describe('Empty', () => {
  test('shows the default empty label', () => {
    const { asFragment } = render(<Empty />);
    const text = screen.getByText(defaultLabel);

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(defaultInlineSnaphsot);
  });

  test('shows the custom empty label', () => {
    const { asFragment } = render(<Empty emptyLabel={mockLabel} />);
    const text = screen.getByText(mockLabel);

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(labelInlineSnapshot);
  });

  test('shows the custom empty label and className', () => {
    const { asFragment } = render(<Empty emptyLabel={mockLabel} className={mockClassName} />);
    const text = screen.getByText(mockLabel);

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(classNameInlineSnapshot);
  });

  test('shows the fully custom empty component', () => {
    const { asFragment } = render(<Empty emptyLabel={mockLabel2} className={mockClassName} component={mockComponent} />);
    const text = screen.getByText(mockLabel2);

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(customInlineSnapshot);
  });
});
