import IntervalCalendar from '@knightburton/react-interval-calendar';
import './App.css';

const getLabel = (data: { isFirstDayOfYear: boolean; isFirstDayOfMonth: boolean; day: string; date: Date }) => {
  if (data.isFirstDayOfYear) return data.date.toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
  if (data.isFirstDayOfMonth) return data.date.toLocaleString('default', { day: '2-digit', month: 'short' });
  return data.day;
};

const App = () => (
  <div className="wrapper">
    <IntervalCalendar
      weekStartsOn={1}
      start={new Date(2023, 0, 1)}
      end={new Date(2023, 11, 31)}
      height={700}
      onCellClick={cell => console.log(cell)}
      containerClassName="container"
      headerContainerClassName="headerContainer"
      headerCellClassName="headerCell"
      headerCellContentClassName="headerCellContent"
      headerCellContentComponent={({ data, className }) => <span className={className}>{data.long}</span>}
      bodyRowClassName="bodyRow"
      bodyCellClassName="bodyCell"
      bodyCellContentComponent={({ data }) => <span className={`${data.isMonthEven ? 'evenMonth' : ''} ${data.isToday ? 'today' : ''}`}>{getLabel(data)}</span>}
    />
  </div>
);

export default App;
