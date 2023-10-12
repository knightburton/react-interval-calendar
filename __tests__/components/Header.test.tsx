import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Header, { HeaderCellContentProps, HeaderProps, HeaderCellProps } from '../../src/components/Header';

const mockRootSlot = ({ children, className }: HeaderProps): JSX.Element => (
  <div role="list" className={className}>
    {children}
  </div>
);
const mockCellSlot = ({ children, className }: HeaderCellProps): JSX.Element => (
  <div role="listitem" className={className}>
    {children}
  </div>
);
const mockCellContentSlot = ({ data, className }: HeaderCellContentProps): JSX.Element => <p className={className}>{data.long}</p>;
const mockRootClassName = 'test-header';
const mockCellClassName = 'test-cell';
const mockCellContentClassName = 'test-cell-content';
const inlineSnapshot = `
<div>
  <div
    class="header test-header"
    role="list"
  >${['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday']
    .map(
      day => `
    <div
      class="header__cell test-cell"
      role="listitem"
    >
      <p
        class="header__cell__content test-cell-content"
      >
        ${day}
      </p>
    </div>`,
    )
    .join('')}
  </div>
</div>
`;

describe('Header', () => {
  test('render nothing based on disabled slotProps.root', () => {
    const { container } = render(<Header slotProps={{ root: { disabled: true } }} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('shows the default Header without any specific prop', () => {
    render(<Header />);
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    const firstItem = screen.getByText('Sun');

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(7);
    expect(firstItem).toBeInTheDocument();
  });

  test('shows the default Header with different locale and week start on props', () => {
    render(<Header weekStartsOn={1} locale="hu-HU" />);
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    const firstItem = screen.getByText('H');

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(7);
    expect(firstItem).toBeInTheDocument();
  });

  test('shows the Header with all the possible slotProps and slots changed', () => {
    const { container } = render(
      <Header
        weekStartsOn={3}
        locale="en-GB"
        slots={{
          root: mockRootSlot,
          cell: mockCellSlot,
          cellContent: mockCellContentSlot,
        }}
        slotProps={{
          root: { className: mockRootClassName },
          cell: { className: mockCellClassName },
          cellContent: { className: mockCellContentClassName },
        }}
      />,
    );
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    const firstItem = screen.getByText('Wednesday');

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(7);
    expect(firstItem).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(inlineSnapshot);
  });
});
