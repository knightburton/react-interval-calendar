import React from 'react';
import BodyContainer, { BodyContainerProps } from './BodyContainer';

interface BodyProps {
  startDate: Date | null;
  numberOfWeeks: number;
  renderRow: (numberOfWeek: number) => JSX.Element;
  containerComponent: React.FC<BodyContainerProps>;
  containerClassName?: string;
}

const Body = ({ startDate, numberOfWeeks, renderRow, containerComponent: ContainerComponent, containerClassName }: BodyProps): JSX.Element => (
  <BodyContainer component={ContainerComponent} className={containerClassName}>
    {!!startDate && Array.from(Array(numberOfWeeks + 1).keys()).map(numberOfWeek => renderRow(numberOfWeek))}
  </BodyContainer>
);

export default Body;
