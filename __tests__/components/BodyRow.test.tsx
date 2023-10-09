import * as React from 'react';
import { render, screen } from '@testing-library/react';
import BodyRow, { BodyRowProps, BodyRowPrivateProps } from '../../src/components/BodyRow';
import { BodyCellProps } from '../../src/components/BodyCell';
import BodyCellContent from '../../src/components/BodyCellContent';
import { mockIntersectionInstance, mockAllIsIntersecting } from '../testUtils';

const Root = React.forwardRef<HTMLUListElement, BodyRowProps>(
  ({ children, className }, ref): JSX.Element => (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  ),
);
const Cell = ({ children }: BodyCellProps): JSX.Element => <li role="presentation">{children}</li>;

const mockBodyRowProps: BodyRowPrivateProps = {
  numberOfWeek: 0,
  locale: 'en-GB',
  numberOfRowsPreRender: 1,
  numberOfTodayWeek: 1,
  startDate: new Date(2023, 1, 18),
  startRenderOnCurrentWeek: false,
  updateVisibilityMatrix: jest.fn(),
  visibilityMatrix: { 0: false, 1: true, 2: false, 3: false },
  slots: {
    root: Root,
    cell: Cell,
    cellContent: BodyCellContent,
  },
  slotProps: {
    root: { className: 'test-body-row' },
  },
};
const inlineSnapshot = `
<ul
  class="body__row test-body-row"
>
  <li
    role="presentation"
  >
    <div
      class="body__cell__content"
    >
      25
    </div>
  </li>
  <li
    role="presentation"
  >
    <div
      class="body__cell__content"
    >
      26
    </div>
  </li>
  <li
    role="presentation"
  >
    <div
      class="body__cell__content"
    >
      27
    </div>
  </li>
  <li
    role="presentation"
  >
    <div
      class="body__cell__content"
    >
      28
    </div>
  </li>
  <li
    role="presentation"
  >
    <div
      class="body__cell__content"
    >
      01 Mar
    </div>
  </li>
  <li
    role="presentation"
  >
    <div
      class="body__cell__content"
    >
      02
    </div>
  </li>
  <li
    role="presentation"
  >
    <div
      class="body__cell__content"
    >
      03
    </div>
  </li>
</ul>
`;

describe('BodyRow', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shows the default BodyRow', () => {
    const { unmount } = render(
      <BodyRow
        numberOfWeek={mockBodyRowProps.numberOfWeek}
        numberOfTodayWeek={mockBodyRowProps.numberOfTodayWeek}
        startRenderOnCurrentWeek={mockBodyRowProps.startRenderOnCurrentWeek}
        locale={mockBodyRowProps.locale}
        numberOfRowsPreRender={mockBodyRowProps.numberOfRowsPreRender}
        startDate={mockBodyRowProps.startDate}
        visibilityMatrix={mockBodyRowProps.visibilityMatrix}
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
        numberOfTodayWeek={mockBodyRowProps.numberOfTodayWeek}
        startRenderOnCurrentWeek={mockBodyRowProps.startRenderOnCurrentWeek}
        locale={mockBodyRowProps.locale}
        numberOfRowsPreRender={mockBodyRowProps.numberOfRowsPreRender}
        startDate={mockBodyRowProps.startDate}
        visibilityMatrix={mockBodyRowProps.visibilityMatrix}
        slots={{}}
        slotProps={mockBodyRowProps.slotProps}
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
        numberOfTodayWeek={2}
        startRenderOnCurrentWeek={mockBodyRowProps.startRenderOnCurrentWeek}
        locale={mockBodyRowProps.locale}
        numberOfRowsPreRender={mockBodyRowProps.numberOfRowsPreRender}
        startDate={mockBodyRowProps.startDate}
        visibilityMatrix={{ 0: true, 1: true, 2: true, 3: true }}
        slots={{ root: Root }}
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
        numberOfWeek={1}
        numberOfTodayWeek={mockBodyRowProps.numberOfTodayWeek}
        startRenderOnCurrentWeek
        locale={mockBodyRowProps.locale}
        numberOfRowsPreRender={mockBodyRowProps.numberOfRowsPreRender}
        startDate={mockBodyRowProps.startDate}
        visibilityMatrix={{ 0: true, 1: true, 2: true, 3: true }}
        slots={mockBodyRowProps.slots}
        slotProps={mockBodyRowProps.slotProps}
        updateVisibilityMatrix={mockBodyRowProps.updateVisibilityMatrix}
      />,
    );

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    expect(asFragment().firstChild).toMatchInlineSnapshot(inlineSnapshot);

    unmount();
  });
});
