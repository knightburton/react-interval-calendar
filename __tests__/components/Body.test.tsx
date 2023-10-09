import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Body, { BodyPrivateProps } from '../../src/components/Body';
import { mockAllIsIntersecting } from '../testUtils';

const mockBodyProps: BodyPrivateProps = {
  startDate: new Date(2023, 1, 16, 0, 0, 0, 0),
  numberOfWeeks: 3,
  numberOfTodayWeek: 1,
  startRenderOnCurrentWeek: false,
  locale: 'en-EN',
  numberOfRowsPreRender: 3,
  updateVisibilityMatrix: jest.fn(),
  visibilityMatrix: { 0: false, 1: true, 2: false, 3: false },
  slots: {
    row: React.forwardRef<HTMLParagraphElement>((_, ref): JSX.Element => <p ref={ref}>week</p>),
  },
};
const defaultInlineSnapshot = `
<div
  class="body"
  id="test"
>
  <p>
    week
  </p>
  <p>
    week
  </p>
  <p>
    week
  </p>
  <p>
    week
  </p>
</div>
`;
const customInlineSnapshot = `
<div
  class="body"
>
  <p>
    week
  </p>
  <p>
    week
  </p>
  <p>
    week
  </p>
  <p>
    week
  </p>
</div>
`;

describe('Body', () => {
  test('shows the default Body with a 3 weeks date range', () => {
    const { asFragment } = render(<Body {...mockBodyProps} slotProps={{ root: { id: 'test' } }} />);
    const weeks = screen.getAllByText('week');

    mockAllIsIntersecting(true);

    expect(weeks).toBeTruthy();
    expect(weeks).toHaveLength(4);
    expect(asFragment().firstChild).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the default Body with a all props changed', () => {
    const { asFragment } = render(<Body {...mockBodyProps} />);
    const weeks = screen.getAllByText('week');

    mockAllIsIntersecting(true);

    expect(weeks).toBeTruthy();
    expect(weeks).toHaveLength(4);
    expect(asFragment().firstChild).toMatchInlineSnapshot(customInlineSnapshot);
  });
});
