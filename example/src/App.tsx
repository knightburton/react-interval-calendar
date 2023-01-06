import IntervalCalendar from '@knightburton/react-interval-calendar';
import './App.css';

const App = () => (
  <div className="wrapper">
    <IntervalCalendar
      weekStartsOn={1}
      start={new Date(2023, 0, 1)}
      end={new Date(2023, 11, 31)}
      locale="en-US"
      height={700}
      onCellClick={cell => console.log(cell)}
      containerClassName="container"
      headerContainerClassName="headerContainer"
      headerCellClassName="headerCell"
      headerCellContentClassName="headerCellContent"
      bodyRowClassName='bodyRow'
      bodyCellClassName="bodyCell"
      bodyCellContentComponent={({ data }) => <span className={`${data.isMonthEven ? 'evenMonth' : ''} ${data.isToday ? 'today': ''}`}>{data.day}</span>}
    />
  </div>
);

export default App;
