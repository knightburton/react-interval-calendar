import IntervalCalendar from '@knightburton/react-interval-calendar';
import './App.css';

const App = () => (
  <div className="wrapper">
    <IntervalCalendar weekStartsOn={1} start={new Date(2023, 0, 1)} end={new Date(2023, 11, 31)} locale="en-US" bodyHeight={700} onCellClick={() => {}} />
  </div>
);

export default App;
