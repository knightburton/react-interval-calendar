import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Container, { ContainerProps } from '../../src/components/Container';

const mockText = 'Mock Children';
const mockChildren = <span>{mockText}</span>;
const mockComponent = ({ className, children, style }: ContainerProps) => (
  <p className={className} style={style}>
    {children}
  </p>
);
const defaultInlineSnapshot = `
<div
  class="calendar"
>
  <span>
    Mock Children
  </span>
</div>
`;
const heightInlineSnapshot = `
<div
  class="calendar"
  style="height: 100px;"
>
  <span>
    Mock Children
  </span>
</div>
`;
const componentInlineSnapshot = `
<p
  class="calendar"
>
  <span>
    Mock Children
  </span>
</p>
`;
const customClassInlineSnapshot = `
<p
  class="calendar test-calendar"
>
  <span>
    Mock Children
  </span>
</p>
`;

describe('Container', () => {
  test('shows the default Container with a simple dom element as children', () => {
    const { asFragment } = render(<Container>{mockChildren}</Container>);
    const text = screen.getByText(mockText);

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the default Container with a simple dom element as children and style slot props on root', () => {
    const { asFragment } = render(<Container slotProps={{ root: { style: { height: 100 } } }}>{mockChildren}</Container>);
    const text = screen.getByText(mockText);

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(heightInlineSnapshot);
  });

  test('shows the given Container with a simple component as root slot', () => {
    const { asFragment } = render(<Container slots={{ root: mockComponent }}>{mockChildren}</Container>);
    const text = screen.getByText(mockText);

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(componentInlineSnapshot);
  });

  test('shows the given Container with a root slot and custom className slot props and a simple dom element as children', () => {
    const { asFragment } = render(
      <Container slots={{ root: mockComponent }} slotProps={{ root: { className: 'test-calendar' } }}>
        {mockChildren}
      </Container>,
    );
    const text = screen.getByText(mockText);

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(customClassInlineSnapshot);
  });
});
