import * as React from 'react';
import { render, screen } from '@testing-library/react';
import BodyContainer, { BodyContainerProps } from '../../src/components/BodyContainer';

const mockText = 'Mock Children';
const mockChildren = <span>{mockText}</span>;
const mockComponent = ({ className, children }: BodyContainerProps) => <p className={className}>{children}</p>;
const mockClassName = 'test-body-container';
const defaultInlineSnapshot = `
<div
  class="body"
>
  <span>
    Mock Children
  </span>
</div>
`;
const customClassInlineSnapshot = `
<p
  class="body ${mockClassName}"
>
  <span>
    Mock Children
  </span>
</p>
`;

describe('BodyContainer', () => {
  test('shows the default BodyContainer with a simple dom element as children', () => {
    const { asFragment } = render(<BodyContainer>{mockChildren}</BodyContainer>);
    const text = screen.getByText(mockText);

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the given BodyContainer with custom component, classname and simple dom element as children', () => {
    const { asFragment } = render(
      <BodyContainer component={mockComponent} className={mockClassName}>
        {mockChildren}
      </BodyContainer>,
    );
    const text = screen.getByText(mockText);

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(customClassInlineSnapshot);
  });
});
