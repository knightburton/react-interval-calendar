# react-interval-calendar
Infinite scrolling based calendar for interval dates built with React.

### Getting started
#### Compatibility
Your project needs to use [React.js](https://reactjs.org/) 16.0 or later.

React-Interval-Calendar uses modern web technologies. It's only supports [modern web browser with internationalization API](https://caniuse.com/internationalization). In legacy browsers you have to use additional polyfill for internationalization to be able to use this library.

#### Installation
```bash
$ npm i react-interval-calendar
```
or
```bash
yarn add react-interval-calendar
```

### Usage
Here's an example of basic usage:
```jsx
import IntervalCalendar from 'react-interval-calendar';

const App = () => (
  <IntervalCalendar
    weekStartsOn={1}
    start={new Date(2021, 1, 1)}
    end={new Date(2021, 6, 31)}
    highlighted={[
      { key: 'audit', start: new Date(2021, 1, 16), end: new Date(2021, 1, 20) },
    ]}
    height={700}
    showToday={false}
    showMonths
    showYears
    showBorder
    showBorderRadius
    fadeWeekends
  />
);

export default App;
```
For more detailed example check the [example](./example) directory.

### Development
Local development is broken into two parts (ideally using two terminal tabs).

First, run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.
```bash
$ npm start
```
The second part will be running the `example/` create-react-app that's linked to the local version of your module.
```bash
$ cd example
$ npm start
```

### Contributing

First off all, thanks for taking the time to contribute! :muscle:

Before any action, please visit the [Code of Conduct](https://github.com/knightburton/react-interval-calendar/blob/main/CODE_OF_CONDUCT.md) and [Contributing guideline](https://github.com/knightburton/react-interval-calendar/blob/main/CONTRIBUTING.md) for more information.

### License

React Interval Calendar is Open Source software under the MIT license. Complete license and copyright information can be found within the [license](https://github.com/knightburton/react-interval-calendar/blob/main/LICENSE).
