# react-interval-calendar

[![Build Workflow](https://github.com/knightburton/react-interval-calendar/actions/workflows/build.yml/badge.svg)](https://github.com/knightburton/react-interval-calendar/actions/workflows/build.yml)

<div align="left">
  <img width="260" alt="react-interval-calendar-light" src="https://user-images.githubusercontent.com/12102205/112201819-ef794680-8c10-11eb-80b0-efa8f12e8759.png">
  <img width="260" alt="react-interval-calendar-light" src="https://user-images.githubusercontent.com/12102205/112201977-264f5c80-8c11-11eb-8aa1-f0c70649404c.png">
</div>

Infinite scrolling based calendar for interval dates built with React.

- no additional dependencies
- no additional date library
- customizable
- lightweight

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
import React from 'react';
import IntervalCalendar from 'react-interval-calendar';

const App = () => (
  <IntervalCalendar
    weekStartsOn={1}
    start={new Date(2021, 1, 1)}
    end={new Date(2021, 6, 31)}
    highlighted={[
      {
        key: 'audit',
        start: new Date(2021, 1, 16),
        end: new Date(2021, 1, 20),
      },
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

### Prop-Types
| Prop name | Description | Default value | Example |
| --- | --- | --- | --- |
| start | The beginning of the calendar that should displayed. The calendar will display the whole month of the start date. | `undefined` | `start={new Date(2021, 2, 3)}` |
| end | The end of the calendar that should displayed. The calendar will display the whole month of the end date. | `undefined` | `end={new Date(2021, 11, 1)}` |
| customClassNames | Class name(s) that will be applied to a given calendar item. More details see [Custom Class Names props](#custom-class-names-props). | `{}` | `customClassNames={{ dayText: 'classname' }}` |
| emptyLabel | Content of a label rendered in case of no or invalid start-end interval. | `There is no date range to display` | `emptyLabel="Hey! I'm empty!"` |
| fadeWeekends | Whether the weekends shall be faded or not. | `false` | `fadeWeekends` |
| height | Height of the calendar. Can be a number in pixels, `100%`, `auto` or a `string` that can be evaluated in css. | `500` | `height={750}` |
| highlighted | Array of the intervals that should be highlighted between the start and end date. The highlighted interval cannot intersect with each other yet. More details see [Highlighted Props](#highlighted-props). | `[]` | `highlighted={[{ id: 'audit', start: new Date(2021, 4, 1), end: new Date(2021, 4, 5), color: '#ffff00' }]}` |
| highlightedColorAlpha | Alpha level of the highlighted colors. Can be between `0.0` and `1.0`. | `0.2` | `highlightedColorAlpha={0.5}` |
| locale | Locale that should be used to format and display the days and months. Can be an IETF language tag. | `default` | `locale={hu_HU}` |
| numberOfWeekFirstRender | Number of weeks to render below the visible weeks on the first render. | `8` | `numberOfWeekFirstRender={10}` |
| numberOfWeekPreRender | Number of weeks to render below the visible weeks. Tweaking this can help reduce flickering during scrolling on certain browers/devices. | `4` | `numberOfWeekPreRender={8}` |
| onSelect | Function called when the user clicks a day. It returns a [Day object](#day-object). | `undefined` | `onSelect={day => console.log(day)}` |
| showBorder | Whether the calendar component border shall be rendered or not. | `false` | `showBorder` |
| showBorderRadius | Whether the calendar component border shall be rounded or not. Only takes effect when the `showBorder` prop set to `true`. | `false` | `showBorderRadius` |
| showGutterBetweenHighlighted | Whether a small gutter shall be shown on the highlighted intervals to be more separated or not. | `false` | `showGutterBetweenHighlighted` |
| showHeader | Whether the whole header shall be shown or not. | `true` | `showHeader={false}` |
| showHeaderWeekdays | Whether the name of the day shall be shown in the header columns or not. Only takes effect when the `showHeader` prop set to `true`. | `true` | `showHeaderWeekdays={false}` |
| showMonthStripes | Whether the months background color stripes shall be shown or not. | `true` | `showMonthStripes={false}` |
| showMonths | Whether the month name shall be shown on the first day of a month or not. | `false` | `showMonths` |
| showToday | Whether the current day shall be highlighted or not. | `true` | `showToday={false}` |
| showYears | Whether the year number shall be shown on the first day of a month or not. | `false` | `showYears` |
| theme | The color theme of the calendar. Can be `light` or `dark`. | `light` | `theme="dark"` |
| weekStartsOn | The index of the day that the week should starts on. Can be `0`, `1`, `2`, `3`, `4`, `5` or `6`. | `0` | `weekStartsOn={1}` |

#### Custom Class Names Props
The `customClassNames` prop can consume the following props where each prop can be a `string` or an `array of string`:
| Prop name | Description | Applied to |
| --- | --- | --- |
| calendar | Classname(s) that will be applied to the calendar container element. | `div` |
| calendarEmpty | Classname(s) that will be applied to calendar empty state container element. | `div` |
| header | Classname(s) that will be applied to header element. | `div` |
| headerDay | Classname(s) that will be applied to each day cell element inside the header. | `div` |
| weeks | Classname(s) that will be applied to the weeks container element. | `div` |
| week | Classname(s) that will be applied to week container element. | `ul` |
| day | Classname(s) that will be applied to the day container element. | `li` |
| dayText | Classname(s) that will be applied to the main day text element inside the day container. | `span` |
| dayMonthText | Classname(s) that will be applied to the month text element inside the day container. | `span` |
| dayYearText | Classname(s) that will be applied to the year text element inside the day container. | `span` |
| dayHighlighted | Classname(s) that will be applied to the highlighted day element inside the day container. | `div` |
| daySelected | Classname(s) that will be applied to the user selected day element inside the day container. | `day` |
| dayToday | Classname(s) that will be applied to the current day element inside the day container. | `day` |

#### Highlighted Props
The `highlighted` prop is an array and each item is an `object` and should look like the following:
| Prop name | Description | Required/Optional |
| --- | --- | --- |
| id | Identifies the item inside the array. | Optional |
| key | Identifies the item inside the array. | Optional |
| start | Start date of the highlighted interval. | Required |
| end | End date of the highlighted interval. | Required |
| color | Highilight color of the interval. The color can be in `hex`, `rgb` or `rgba` format. The calendar will convert the color into an `rgba` format where the `alpha` value will be equal to `highlightedColorAlpha` prop by default if that is not provided as part of the color. | Optional |

#### Day Object
The `onSelect` function will return a `Day object` with the following props:
| Prop name | Description |
| --- | --- |
| key | Day identifier that created from the number of week and day of the week. |
| date | Actual Date object of the day. |
| yearLabel | Year label from the actual date. |
| monthLabel | Month label from the actual date formatted with the provided `locale` prop. |
| dayLabel | Day of the month label that is displayed in the calendar. |
| isMonthEven | Describes whether the month of the actual date is even or not. |
| isFirstDayOfMonth | Describes whether the actual date is the first day of the month or not. |
| isLastDayOfMonth | Describes whether the actual date is the last day of the month or not. |
| isToday | Describes whether the actual date is the same date as today or not. |
| isWeekend | Describes whether the actual date is on weekend or not. |
| isHighlighted | Describes whether the actual date is highlighted or not. |
| isFirstOfHighlighted | Describes whether the actual date is the first date of the highlighted interval or not. |
| isLastOfHighlighted | Describes whether the actual date is the last date of the highlighted interval or not. |
| highlightColor | The color of the highlight in `rgba` format. |
| highlightId | The highlight `id` or `key` if the actual date is highlighted. |

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
