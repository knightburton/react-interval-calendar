import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { HeaderCellType } from '../../src/types';
import HeaderCellContent, { HeaderCellContentProps } from '../../src/components/HeaderCellContent';

const mockData: HeaderCellType = {
  key: 0,
  short: 'Sun',
  long: 'Sunday',
  narrow: 'S',
};
const mockClassName = 'test-header-cell-content';
const mockComponent = ({ data, className }: HeaderCellContentProps) => <p className={className}>{data.long}</p>;
const defaultInlineSnapshot = `
<span
  class="header__cell__content"
>
  Sun
</span>
`;
const classNametInlineSnapshot = `
<span
  class="header__cell__content ${mockClassName}"
>
  Sun
</span>
`;
const customInlineSnapshot = `
<p
  class="header__cell__content ${mockClassName}"
>
  Sunday
</p>
`;

describe('HeaderCellContent', () => {
  test('shows the default HeaderCellContent', () => {
    const { asFragment } = render(<HeaderCellContent data={mockData} />);
    const text = screen.getByText('Sun');

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the default HeaderCellContent with custom className', () => {
    const { asFragment } = render(<HeaderCellContent data={mockData} className={mockClassName} />);
    const text = screen.getByText('Sun');

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(classNametInlineSnapshot);
  });

  test('shows the HeaderCellContent with custom className and custom component', () => {
    const { asFragment } = render(<HeaderCellContent data={mockData} component={mockComponent} className={mockClassName} />);
    const text = screen.getByText('Sunday');

    expect(text).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(customInlineSnapshot);
  });
});
