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
Your project needs to use [React.js](https://reactjs.org/) 16.8 or later.

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
| Prop name | Type | Default value | Description |
| --- | --- | --- | --- |
| start | Date | `undefined` | The beginning of the calendar that should displayed. The calendar will display the whole month of the start date. |
| end | Date | `undefined` | The end of the calendar that should displayed. The calendar will display the whole month of the end date. |
| customClassNames | object | `{}` | Class name(s) that will be applied to a given calendar item. More details see [Custom Class Names props](#custom-class-names-props). |
| emptyLabel | string | `There is no date range to display` | Content of a label rendered in case of no or invalid start-end interval. |
| fadeWeekends | boolean | `false` | Whether the weekends shall be faded or not. |
| height | number or string | `500` | Height of the calendar. Can be a number in pixels, `100%`, `auto` or a `string` that can be evaluated in css. |
| highlighted | array | `[]` | Array of the intervals that should be highlighted between the start and end date. The highlighted interval cannot intersect with each other yet. More details see [Highlighted Props](#highlighted-props). |
| highlightedColorAlpha | number | `0.2` | Alpha level of the highlighted colors. Can be between `0.0` and `1.0`. |
| locale | string | `default` | Locale that should be used to format and display the days and months. Can be an IETF language tag. |
| numberOfWeekFirstRender | number | `8` | Number of weeks to render below the visible weeks on the first render. |
| numberOfWeekPreRender | number | `4` | Number of weeks to render below the visible weeks. Tweaking this can help reduce flickering during scrolling on certain browers/devices. |
| onSelect | function | `undefined` | Function called when the user clicks a day. It returns a [Day object](#day-object). |
| showBorder | boolean | `false` | Whether the calendar component border shall be rendered or not. |
| showBorderRadius | boolean | `false` | Whether the calendar component border shall be rounded or not. Only takes effect when the `showBorder` prop set to `true`. |
| showGutterBetweenHighlighted | boolean | `false` | Whether a small gutter shall be shown on the highlighted intervals to be more separated or not. |
| showHeader | boolean | `true` | Whether the whole header shall be shown or not. |
| showHeaderWeekdays | boolean | `true` | Whether the name of the day shall be shown in the header columns or not. Only takes effect when the `showHeader` prop set to `true`. |
| showMonthStripes | boolean | `true` | Whether the months background color stripes shall be shown or not. |
| showMonths | boolean | `false` | Whether the month name shall be shown on the first day of a month or not. |
| showToday | boolean | `true` | Whether the current day shall be highlighted or not. |
| showYears | boolean | `false` | Whether the year number shall be shown on the first day of a month or not. |
| theme | string | `light` | The color theme of the calendar. Can be `light` or `dark`. |
| weekStartsOn | number | `0` | The index of the day that the week should starts on. Can be `0`, `1`, `2`, `3`, `4`, `5` or `6`. |

#### Custom Class Names Props
The `customClassNames` prop can consume the following props where each prop can be a `string` or an `array of string`:
| Prop name | Description |
| --- | --- |
| calendar | Classname(s) that will be applied to the calendar container element. |
| calendarEmpty | Classname(s) that will be applied to calendar empty state container element. |
| header | Classname(s) that will be applied to header element. |
| headerDay | Classname(s) that will be applied to each day cell element inside the header. |
| weeks | Classname(s) that will be applied to the weeks container element. |
| week | Classname(s) that will be applied to week container element. |
| day | Classname(s) that will be applied to the day container element. |
| dayText | Classname(s) that will be applied to the main day text element inside the day container. |
| dayMonthText | Classname(s) that will be applied to the month text element inside the day container. |
| dayYearText | Classname(s) that will be applied to the year text element inside the day container. |
| dayHighlighted | Classname(s) that will be applied to the highlighted day element inside the day container. |
| daySelected | Classname(s) that will be applied to the user selected day element inside the day container. |
| dayToday | Classname(s) that will be applied to the current day element inside the day container. |

#### Highlighted Props
The `highlighted` prop is an array and each item is an `object` and should look like the following:
| Prop name | Required/Optional | Description |
| --- | --- | --- |
| id | Optional | Identifies the item inside the array. |
| key | Optional | Identifies the item inside the array. |
| start | Required | Start date of the highlighted interval. |
| end | Required | End date of the highlighted interval. |
| color | Optional | Highilight color of the interval. The color can be in `hex`, `rgb` or `rgba` format. The calendar will convert the color into an `rgba` format where the `alpha` value will be equal to `highlightedColorAlpha` prop by default if that is not provided as part of the color. |

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
# Assume that you are in the project main folder
$ npm i
$ npm start
```
The second part will be running the `example/` create-react-app that's linked to the local version of your module.
```bash
# Assume that you are in the project main folder
$ cd example
$ npm i
$ npm start
```

### Contributing

First off all, thanks for taking the time to contribute! :muscle:

Before any action, please visit the [Code of Conduct](https://github.com/knightburton/react-interval-calendar/blob/main/CODE_OF_CONDUCT.md) and [Contributing guideline](https://github.com/knightburton/react-interval-calendar/blob/main/CONTRIBUTING.md) for more information.

### License

React Interval Calendar is Open Source software under the MIT license. Complete license and copyright information can be found within the [license](https://github.com/knightburton/react-interval-calendar/blob/main/LICENSE).
