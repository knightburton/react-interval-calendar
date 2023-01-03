import React from 'react';
import { BodyContainerProps } from './BodyContainer';

interface BodyProps {
  startDate: Date | null;
  numberOfWeeks: number;
  containerComponent: React.ComponentType<BodyContainerProps>;
  renderRow: (numberOfWeek: number) => JSX.Element;
}

const Body = ({ startDate, numberOfWeeks, containerComponent: ContainerComponent, renderRow }: BodyProps): JSX.Element => (
  <ContainerComponent>{!!startDate && Array.from(Array(numberOfWeeks + 1).keys()).map(numberOfWeek => renderRow(numberOfWeek))}</ContainerComponent>
);

export default Body;
