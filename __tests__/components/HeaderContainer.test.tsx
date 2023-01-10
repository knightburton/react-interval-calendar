import * as React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderContainer, { HeaderContainerProps } from '../../src/components/HeaderContainer';

const mockItemText = 'Mock Item';
const mockChildren = (
  <ul>
    <li>{mockItemText}</li>
    <li>{mockItemText}</li>
    <li>{mockItemText}</li>
  </ul>
);
const mockClassName = 'test-header-container';
const mockComponent = ({ className, children }: HeaderContainerProps) => <header className={className}>{children}</header>;
const defaultInlineSnapshot = `
<div
  class="header"
>
  <ul>
    <li>
      Mock Item
    </li>
    <li>
      Mock Item
    </li>
    <li>
      Mock Item
    </li>
  </ul>
</div>
`;
const customInlineSnapshot = `
<header
  class="header"
>
  <ul>
    <li>
      Mock Item
    </li>
    <li>
      Mock Item
    </li>
    <li>
      Mock Item
    </li>
  </ul>
</header>
`;
const classNametInlineSnapshot = `
<div
  class="header test-header-container"
>
  <ul>
    <li>
      Mock Item
    </li>
    <li>
      Mock Item
    </li>
    <li>
      Mock Item
    </li>
  </ul>
</div>
`;

describe('HeaderContainer', () => {
  test('shows the default HeaderContainer with a simple children', () => {
    const { asFragment } = render(<HeaderContainer>{mockChildren}</HeaderContainer>);
    const texts = screen.getAllByText(mockItemText);

    expect(texts).toBeTruthy();
    expect(texts).toHaveLength(3);
    expect(asFragment().firstChild).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the HeaderContainer with a simple children and custom component', () => {
    const { asFragment } = render(<HeaderContainer component={mockComponent}>{mockChildren}</HeaderContainer>);
    const texts = screen.getAllByText(mockItemText);

    expect(texts).toBeTruthy();
    expect(texts).toHaveLength(3);
    expect(asFragment().firstChild).toMatchInlineSnapshot(customInlineSnapshot);
  });

  test('shows the default HeaderContainer with a simple children and additional className', () => {
    const { asFragment } = render(<HeaderContainer className={mockClassName}>{mockChildren}</HeaderContainer>);
    const texts = screen.getAllByText(mockItemText);

    expect(texts).toBeTruthy();
    expect(texts).toHaveLength(3);
    expect(asFragment().firstChild).toMatchInlineSnapshot(classNametInlineSnapshot);
  });
});
