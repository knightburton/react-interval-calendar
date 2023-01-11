import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BodyCell, { BodyCellProps } from '../../src/components/BodyCell';
import { mockBodyCellAttributes } from '../testUtils';

const mockBodyCellProps: BodyCellProps = {
  data: mockBodyCellAttributes(),
  locale: 'hu-HU',
  onClick: jest.fn(),
  contentComponent: ({ data, className }) => <p className={className}>{data.day}</p>,
  className: 'test-body-cell',
  contentClassName: 'test-body-cell-content',
};
const defaultInlineSnapshot = `
<li
  class="body__cell"
  role="presentation"
>
  <span
    class="body__cell__content"
  >
    18
  </span>
</li>
`;
const customInlineSnapshot = `
<li
  class="body__cell test-body-cell"
  role="presentation"
>
  <p
    class="body__cell__content test-body-cell-content"
  >
    18
  </p>
</li>
`;

describe('BodyCell', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shows the default BodyCell with basic data', () => {
    const { asFragment } = render(<BodyCell data={mockBodyCellProps.data} />);
    const dayText = screen.getByText('18');
    const listItems = screen.getAllByRole('presentation');

    expect(dayText).toBeTruthy();
    expect(listItems.length).toEqual(1);
    expect(asFragment().firstChild).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the BodyCell with override components and classNames', () => {
    const { asFragment } = render(
      <BodyCell
        data={mockBodyCellProps.data}
        locale={mockBodyCellProps.locale}
        onClick={mockBodyCellProps.onClick}
        contentComponent={mockBodyCellProps.contentComponent}
        contentClassName={mockBodyCellProps.contentClassName}
        className={mockBodyCellProps.className}
      />,
    );
    const dayText = screen.getByText('18');
    const listItems = screen.getAllByRole('presentation');

    expect(dayText).toBeTruthy();
    expect(listItems.length).toEqual(1);
    expect(asFragment().firstChild).toMatchInlineSnapshot(customInlineSnapshot);
  });

  test('fire presentation item on click without handler', () => {
    render(<BodyCell data={mockBodyCellProps.data} />);
    const listItem = screen.getByRole('presentation');

    fireEvent.click(listItem);
    expect(mockBodyCellProps.onClick).not.toHaveBeenCalled();
  });

  test('fire presentation item on click with handler', () => {
    render(<BodyCell data={mockBodyCellProps.data} onClick={mockBodyCellProps.onClick} />);
    const listItem = screen.getByRole('presentation');

    fireEvent.click(listItem);
    expect(mockBodyCellProps.onClick).toHaveBeenCalledWith(mockBodyCellProps.data);
  });
});
