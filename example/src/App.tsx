import IntervalCalendar from '@knightburton/react-interval-calendar';
import './App.css';

const App = () => (
  <div className="wrapper">
    <p>Interval Calendar Example</p>
    <IntervalCalendar
      weekStartsOn={1}
      start={new Date(2021, 1, 1)}
      end={new Date(2021, 6, 31)}
      highlighted={[
        { key: 'holiday', start: new Date(2021, 1, 16), end: new Date(2021, 1, 20) },
        { key: 'cleaning', start: new Date(2021, 2, 24), end: new Date(2021, 3, 9), color: 'rgba(0, 255, 0, 0.4)' },
      ]}
      height={700}
      showMonths
      showYears
      showBorder
      showBorderRadius
      fadeWeekends
      onSelect={() => {}}
    />
  </div>
);

export default App;
