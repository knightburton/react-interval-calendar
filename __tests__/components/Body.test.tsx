import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Body, { BodyProps } from '../../src/components/Body';

const mockBodyProps: BodyProps = {
  startDate: new Date(2023, 1, 16, 0, 0, 0, 0),
  numberOfWeeks: 3,
  renderRow: numberOfWeek => <p key={numberOfWeek}>{`${numberOfWeek}. week`}</p>,
  containerComponent: ({ children, className }) => <div className={className}>{children}</div>,
  containerClassName: 'test-body',
};
const defaultInlineSnapshot = `
<div
  class="body"
>
  <p>
    0. week
  </p>
  <p>
    1. week
  </p>
  <p>
    2. week
  </p>
  <p>
    3. week
  </p>
</div>
`;
const customInlineSnapshot = `
<div
  class="body test-body"
>
  <p>
    0. week
  </p>
  <p>
    1. week
  </p>
  <p>
    2. week
  </p>
  <p>
    3. week
  </p>
</div>
`;

describe('Body', () => {
  test('shows the default Body with a 3 weeks date range', () => {
    const { asFragment } = render(<Body startDate={mockBodyProps.startDate} numberOfWeeks={mockBodyProps.numberOfWeeks} renderRow={mockBodyProps.renderRow} />);
    const firstWeekText = screen.getByText('0. week');
    const thirdWeekText = screen.getByText('3. week');

    expect(firstWeekText).toBeTruthy();
    expect(thirdWeekText).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(defaultInlineSnapshot);
  });

  test('shows the default Body with a all props changed', () => {
    const { asFragment } = render(
      <Body
        startDate={mockBodyProps.startDate}
        numberOfWeeks={mockBodyProps.numberOfWeeks}
        renderRow={mockBodyProps.renderRow}
        containerComponent={mockBodyProps.containerComponent}
        containerClassName={mockBodyProps.containerClassName}
      />,
    );
    const firstWeekText = screen.getByText('0. week');
    const thirdWeekText = screen.getByText('3. week');

    expect(firstWeekText).toBeTruthy();
    expect(thirdWeekText).toBeTruthy();
    expect(asFragment().firstChild).toMatchInlineSnapshot(customInlineSnapshot);
  });
});
