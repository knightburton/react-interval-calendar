import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';
import { HeaderContainerProps } from '../../src/components/HeaderContainer';
import { HeaderCellContentProps } from '../../src/components/HeaderCellContent';

const mockContainerComponent = ({ children, className }: HeaderContainerProps): JSX.Element => <div className={className}>{children}</div>;
const mockCellContentComponent = ({ data, className }: HeaderCellContentProps) => <p className={className}>{data.long}</p>;
const mockContainerClassName = 'test-container';
const mockRowClassName = 'test-row';
const mockCellClassName = 'test-cell';
const mockCellContentClassName = 'test-cell-content';
const inlineSnapshot = `
<div
  class="header test-container"
>
  <ul
    class="header__row test-row"
  >${['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday']
    .map(
      day => `
    <li
      class="header__cell test-cell"
    >
      <p
        class="header__cell__content test-cell-content"
      >
        ${day}
      </p>
    </li>`,
    )
    .join('')}
  </ul>
</div>
`;

describe('Header', () => {
  test('render nothing based on enabled prop', () => {
    const { container } = render(<Header enabled={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('shows the default Header without any specific prop', () => {
    render(<Header enabled />);
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    const firstItem = screen.getByText('Sun');

    expect(list).toBeTruthy();
    expect(listItems).toHaveLength(7);
    expect(firstItem).toBeTruthy();
  });

  test('shows the default Header with different locale and week start on props', () => {
    render(<Header weekStartsOn={1} locale="hu-HU" enabled />);
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    const firstItem = screen.getByText('H');

    expect(list).toBeTruthy();
    expect(listItems).toHaveLength(7);
    expect(firstItem).toBeTruthy();
  });

  test('shows the Header with all the possible props changed', () => {
    const { asFragment } = render(
      <Header
        weekStartsOn={3}
        locale="en-GB"
        enabled
        containerComponent={mockContainerComponent}
        cellContentComponent={mockCellContentComponent}
        containerClassName={mockContainerClassName}
        rowClassName={mockRowClassName}
        cellClassName={mockCellClassName}
        cellContentClassName={mockCellContentClassName}
      />,
    );
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    const firstItem = screen.getByText('Wednesday');

    expect(list).toBeTruthy();
    expect(listItems).toHaveLength(7);
    expect(firstItem).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(inlineSnapshot);
  });
});
