import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BodyCell, { BodyCellPrivateProps } from '../../src/components/BodyCell';
import { mockBodyCellAttributes } from '../testUtils';

const mockBodyCellProps: BodyCellPrivateProps = {
  data: mockBodyCellAttributes(),
  locale: 'hu-HU',
  slots: {
    content: ({ data, className }) => <p className={className}>{data.day}</p>,
  },
  slotProps: {
    root: { className: 'test-body-cell', onClick: jest.fn() },
    content: { className: 'test-body-cell-content' },
  },
};
const defaultInlineSnapshot = `
<li
  class="body__cell"
  role="presentation"
>
  <div
    class="body__cell__content"
  >
    18
  </div>
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

  test('shows the BodyCell with override slots', () => {
    const { asFragment } = render(
      <BodyCell data={mockBodyCellProps.data} locale={mockBodyCellProps.locale} slots={mockBodyCellProps.slots} slotProps={mockBodyCellProps.slotProps} />,
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
    expect(mockBodyCellProps.slotProps?.root?.onClick).not.toHaveBeenCalled();
  });

  test('fire presentation item on click with handler', () => {
    render(<BodyCell data={mockBodyCellProps.data} slotProps={mockBodyCellProps.slotProps} />);
    const listItem = screen.getByRole('presentation');

    fireEvent.click(listItem);
    expect(mockBodyCellProps.slotProps?.root?.onClick).toHaveBeenCalled();
  });
});
