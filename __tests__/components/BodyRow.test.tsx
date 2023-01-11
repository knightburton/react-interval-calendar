import * as React from 'react';
import { render, screen } from '@testing-library/react';
import BodyRow, { BodyRowProps } from '../../src/components/BodyRow';
import { BodyCellType } from '../../src/types';
import { mockIntersectionInstance, mockAllIsIntersecting } from '../testUtils';

const mockBodyRowProps: BodyRowProps = {
  numberOfWeek: 0,
  locale: 'en-GB',
  numberOfRowsPreRender: 1,
  startDate: new Date(2023, 1, 18),
  updateVisibilityMatrix: jest.fn(),
  visibilityMatrix: { 0: false, 1: true, 2: false, 3: false },
  renderCell: (cell: BodyCellType) => (
    <span role="presentation" key={cell.key}>
      {cell.day}
    </span>
  ),
  className: 'test-body-row',
};
const inlineSnapshot = `
<ul
  class="body__row test-body-row"
>
  <span
    role="presentation"
  >
    18
  </span>
  <span
    role="presentation"
  >
    19
  </span>
  <span
    role="presentation"
  >
    20
  </span>
  <span
    role="presentation"
  >
    21
  </span>
  <span
    role="presentation"
  >
    22
  </span>
  <span
    role="presentation"
  >
    23
  </span>
  <span
    role="presentation"
  >
    24
  </span>
</ul>
`;

describe('BodyRow', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shows the default BodyRow', () => {
    const { unmount } = render(
      <BodyRow
        numberOfWeek={mockBodyRowProps.numberOfWeek}
        locale={mockBodyRowProps.locale}
        numberOfRowsPreRender={mockBodyRowProps.numberOfRowsPreRender}
        startDate={mockBodyRowProps.startDate}
        visibilityMatrix={mockBodyRowProps.visibilityMatrix}
        renderCell={mockBodyRowProps.renderCell}
      />,
    );
    const list = screen.getByRole('list');
    const listItems = screen.queryAllByRole('presentation');
    const observer = mockIntersectionInstance(list);

    expect(observer?.observe).toHaveBeenCalled();
    expect(listItems.length).toEqual(0);

    unmount();

    expect(observer?.disconnect).toHaveBeenCalled();
  });

  test('shows the default BodyRow with visibility matrix update trigger', () => {
    const { unmount } = render(
      <BodyRow
        numberOfWeek={mockBodyRowProps.numberOfWeek}
        locale={mockBodyRowProps.locale}
        numberOfRowsPreRender={mockBodyRowProps.numberOfRowsPreRender}
        startDate={mockBodyRowProps.startDate}
        visibilityMatrix={mockBodyRowProps.visibilityMatrix}
        renderCell={mockBodyRowProps.renderCell}
        updateVisibilityMatrix={mockBodyRowProps.updateVisibilityMatrix}
      />,
    );
    const list = screen.getByRole('list');
    const listItems = screen.queryAllByRole('presentation');
    const observer = mockIntersectionInstance(list);

    mockAllIsIntersecting(true);

    expect(observer?.observe).toHaveBeenCalled();
    expect(listItems.length).toEqual(0);
    expect(mockBodyRowProps.updateVisibilityMatrix).toHaveBeenCalledWith(0);

    unmount();

    expect(observer?.disconnect).toHaveBeenCalled();
  });

  test('shows one week list items based on the visibility matrix', () => {
    const { unmount } = render(
      <BodyRow
        numberOfWeek={mockBodyRowProps.numberOfWeek}
        locale={mockBodyRowProps.locale}
        numberOfRowsPreRender={mockBodyRowProps.numberOfRowsPreRender}
        startDate={mockBodyRowProps.startDate}
        visibilityMatrix={{ 0: true, 1: true, 2: true, 3: true }}
        renderCell={mockBodyRowProps.renderCell}
        updateVisibilityMatrix={mockBodyRowProps.updateVisibilityMatrix}
      />,
    );
    const list = screen.getByRole('list');
    const listItems = screen.queryAllByRole('presentation');
    const observer = mockIntersectionInstance(list);

    expect(observer?.observe).toHaveBeenCalled();
    expect(listItems.length).toEqual(7);

    unmount();

    expect(observer?.disconnect).toHaveBeenCalled();
  });

  test('shows the BodyRow with fully customized props', () => {
    const { unmount, asFragment } = render(
      <BodyRow
        numberOfWeek={mockBodyRowProps.numberOfWeek}
        locale={mockBodyRowProps.locale}
        numberOfRowsPreRender={mockBodyRowProps.numberOfRowsPreRender}
        startDate={mockBodyRowProps.startDate}
        visibilityMatrix={{ 0: true, 1: true, 2: true, 3: true }}
        renderCell={mockBodyRowProps.renderCell}
        updateVisibilityMatrix={mockBodyRowProps.updateVisibilityMatrix}
        className={mockBodyRowProps.className}
      />,
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(inlineSnapshot);

    unmount();
  });
});
