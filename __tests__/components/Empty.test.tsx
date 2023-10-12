import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Empty, { EmptyProps } from '../../src/components/Empty';

const defaultLabel = 'There is no date range to display';
const mockLabel = 'Hey! Get over here!';
const mockLabel2 = 'Mocking you!';
const mockClassName = 'test-empty';
const mockComponent = ({ className, label }: EmptyProps): JSX.Element => <p className={className}>{label}</p>;
const defaultInlineSnapshot = `
<div>
  <div
    class="empty"
  >
    <p>
      ${defaultLabel}
    </p>
  </div>
</div>
`;
const labelInlineSnapshot = `
<div>
  <div
    class="empty"
  >
    <p>
      ${mockLabel}
    </p>
  </div>
</div>
`;
const classNameInlineSnapshot = `
<div>
  <div
    class="empty ${mockClassName}"
  >
    <p>
      ${mockLabel}
    </p>
  </div>
</div>
`;
const customInlineSnapshot = `
<div>
  <p
    class="empty ${mockClassName}"
  >
    ${mockLabel2}
  </p>
</div>
`;

describe('Empty', () => {
  test('shows the default empty label', () => {
    const { container } = render(<Empty />);
    const text = screen.getByText(defaultLabel);

    expect(text).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the custom empty label', () => {
    const { container } = render(<Empty slotProps={{ root: { label: mockLabel } }} />);
    const text = screen.getByText(mockLabel);

    expect(text).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(labelInlineSnapshot);
  });

  test('shows the custom empty label and className', () => {
    const { container } = render(<Empty slotProps={{ root: { label: mockLabel, className: mockClassName } }} />);
    const text = screen.getByText(mockLabel);

    expect(text).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(classNameInlineSnapshot);
  });

  test('shows the fully custom empty component', () => {
    const { container } = render(<Empty slotProps={{ root: { label: mockLabel2, className: mockClassName } }} slots={{ root: mockComponent }} />);
    const text = screen.getByText(mockLabel2);

    expect(text).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(customInlineSnapshot);
  });
});
