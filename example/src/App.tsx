import IntervalCalendar from 'react-interval-calendar';
import './App.css';

const App = () => (
  <div className="wrapper">
    <p>Interval Calendar Example</p>
    <IntervalCalendar
      weekStartsOn={1}
      start={new Date(2021, 1, 1)}
      end={new Date(2021, 6, 31)}
      fadeWeekends
    />
  </div>
);

export default App;
