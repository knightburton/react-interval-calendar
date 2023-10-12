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
<div>
  <div
    class="calendar"
  >
    <span>
      Mock Children
    </span>
  </div>
</div>
`;
const heightInlineSnapshot = `
<div>
  <div
    class="calendar"
    style="height: 100px;"
  >
    <span>
      Mock Children
    </span>
  </div>
</div>
`;
const componentInlineSnapshot = `
<div>
  <p
    class="calendar"
  >
    <span>
      Mock Children
    </span>
  </p>
</div>
`;
const customClassInlineSnapshot = `
<div>
  <p
    class="calendar test-calendar"
  >
    <span>
      Mock Children
    </span>
  </p>
</div>
`;

describe('Container', () => {
  test('shows the default Container with a simple dom element as children', () => {
    const { container } = render(<Container>{mockChildren}</Container>);
    const text = screen.getByText(mockText);

    expect(text).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the default Container with a simple dom element as children and style slot props on root', () => {
    const { container } = render(<Container slotProps={{ root: { style: { height: 100 } } }}>{mockChildren}</Container>);
    const text = screen.getByText(mockText);

    expect(text).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(heightInlineSnapshot);
  });

  test('shows the given Container with a simple component as root slot', () => {
    const { container } = render(<Container slots={{ root: mockComponent }}>{mockChildren}</Container>);
    const text = screen.getByText(mockText);

    expect(text).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(componentInlineSnapshot);
  });

  test('shows the given Container with a root slot and custom className slot props and a simple dom element as children', () => {
    const { container } = render(
      <Container slots={{ root: mockComponent }} slotProps={{ root: { className: 'test-calendar' } }}>
        {mockChildren}
      </Container>,
    );
    const text = screen.getByText(mockText);

    expect(text).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(customClassInlineSnapshot);
  });
});
