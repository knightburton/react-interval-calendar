import IntervalCalendar from 'react-interval-calendar';
import 'react-interval-calendar/dist/index.css';

const App = () => (
  <div>
    <IntervalCalendar
      weekStartsOn={1}
      start={new Date(2021, 1, 1)}
      end={new Date(2021, 2, 31)}
      fadeWeekends
    />
  </div>
);

export default App;
