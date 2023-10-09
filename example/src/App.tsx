import IntervalCalendar, { ContainerProps, HeaderCellContentProps, BodyCellContentProps } from '@knightburton/react-interval-calendar';
import './App.css';

const getLabel = (data: { isFirstDayOfYear: boolean; isFirstDayOfMonth: boolean; day: string; date: Date }) => {
  if (data.isFirstDayOfYear) return data.date.toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
  if (data.isFirstDayOfMonth) return data.date.toLocaleString('default', { day: '2-digit', month: 'short' });
  return data.day;
};

const Root = ({ children, className }: ContainerProps): JSX.Element => (
  <div className={className} style={{ height: 700, border: '1px solid #eee' }}>
    {children}
  </div>
);

const HeaderCellContent = ({ data, className }: HeaderCellContentProps): JSX.Element => <span className={className}>{data.short}</span>;

const BodyCellContent = ({ data, className }: BodyCellContentProps): JSX.Element => (
  <span className={`${data.isMonthEven ? 'evenMonth' : ''} ${data.isToday ? 'today' : ''} ${className}`}>{getLabel(data)}</span>
);

const App = () => (
  <div className="wrapper">
    <IntervalCalendar
      weekStartsOn={1}
      startRenderOnCurrentWeek
      start={new Date(2023, 0, 1)}
      end={new Date(2023, 11, 31)}
      slots={{
        root: Root,
        headerCellContent: HeaderCellContent,
        bodyCellContent: BodyCellContent,
      }}
      slotProps={{ bodyCell: { onClick: (event, data) => console.log(event, data) } }}
    />
  </div>
);

export default App;
