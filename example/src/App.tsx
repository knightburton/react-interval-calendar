import IntervalCalendar, { ContainerProps, HeaderCellContentProps } from '@knightburton/react-interval-calendar';
import './App.css';

const getLabel = (data: { isFirstDayOfYear: boolean; isFirstDayOfMonth: boolean; day: string; date: Date }) => {
  if (data.isFirstDayOfYear) return data.date.toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
  if (data.isFirstDayOfMonth) return data.date.toLocaleString('default', { day: '2-digit', month: 'short' });
  return data.day;
};

const Container = ({ children, className, style }: ContainerProps): JSX.Element => (
  <div className={className} style={{ ...style, border: '1px solid #eee' }}>
    {children}
  </div>
);

const HeaderCellContent = ({ data, className }: HeaderCellContentProps): JSX.Element => <span className={className}>{data.short}</span>;

const App = () => (
  <div className="wrapper">
    <IntervalCalendar
      weekStartsOn={1}
      start={new Date(2023, 0, 1)}
      end={new Date(2023, 11, 31)}
      onCellClick={cell => console.log(cell)}
      bodyCellContentComponent={({ data }) => <span className={`${data.isMonthEven ? 'evenMonth' : ''} ${data.isToday ? 'today' : ''}`}>{getLabel(data)}</span>}
      slots={{
        container: { root: Container },
        header: { cellContent: HeaderCellContent },
      }}
      slotProps={{
        container: { root: { className: 'example-container', style: { height: 700 } } },
      }}
    />
  </div>
);

export default App;
