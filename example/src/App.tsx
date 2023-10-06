import IntervalCalendar, { ContainerProps } from '@knightburton/react-interval-calendar';
import './App.css';

const getLabel = (data: { isFirstDayOfYear: boolean; isFirstDayOfMonth: boolean; day: string; date: Date }) => {
  if (data.isFirstDayOfYear) return data.date.toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
  if (data.isFirstDayOfMonth) return data.date.toLocaleString('default', { day: '2-digit', month: 'short' });
  return data.day;
};

const Container = ({ children, className, height }: ContainerProps) => (
  <div className={className} style={{ height }}>
    {children}
  </div>
);

const App = () => (
  <div className="wrapper">
    <IntervalCalendar
      weekStartsOn={1}
      start={new Date(2023, 0, 1)}
      end={new Date(2023, 11, 31)}
      onCellClick={cell => console.log(cell)}
      headerCellContentComponent={({ data, className }) => <span className={className}>{data.long}</span>}
      bodyCellContentComponent={({ data }) => <span className={`${data.isMonthEven ? 'evenMonth' : ''} ${data.isToday ? 'today' : ''}`}>{getLabel(data)}</span>}
      slots={{
        container: Container,
      }}
      slotProps={{
        container: { height: 700 },
      }}
    />
  </div>
);

export default App;
