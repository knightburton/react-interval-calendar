# react-interval-calendar

[![Build Workflow](https://github.com/knightburton/react-interval-calendar/actions/workflows/build.yml/badge.svg)](https://github.com/knightburton/react-interval-calendar/actions/workflows/build.yml)
![npm](https://img.shields.io/npm/v/@knightburton/react-interval-calendar)
![npm](https://img.shields.io/npm/dt/@knightburton/react-interval-calendar)

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
$ npm i @knightburton/react-interval-calendar
```
or
```bash
yarn add @knightburton/react-interval-calendar
```

### Usage
Here's an example of basic usage:
```jsx
import React from 'react';
import IntervalCalendar from '@knightburton/react-interval-calendar';

const App = () => (
  <IntervalCalendar
    weekStartsOn={1}
    start={new Date(2021, 1, 1)}
    end={new Date(2021, 6, 31)}
    height={700}
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
| emptyLabel | string | `'There is no date range to display'` | Content of a label rendered in case of no or invalid start-end interval. |
| height | `number` or `'100%'` or `auto'` | `500` | Height of the calendar. Can be a number in pixels, `100%`, `auto` or a `string` that can be evaluated in css. |
| locale | string | `default` | Locale that should be used to format and display the days and months. Can be an IETF language tag. |
| numberOfRowsFirstRender | number | `8` | Number of weeks to render below the visible weeks on the first render. |
| numberOfRowsPreRender | number | `4` | Number of weeks to render below the visible weeks. Tweaking this can help reduce flickering during scrolling on certain browers/devices. |
| onCellClick | function | `undefined` | Function called when the user clicks a cell. It returns a [Cell Data object](#cell-data-object). |
| showHeader | boolean | `true` | Whether the whole header shall be shown or not. |
| weekStartsOn | number | `0` | The index of the day that the week should starts on. Can be `0`, `1`, `2`, `3`, `4`, `5` or `6`. |
| containerComponent | component | `undefined` | React component that should be rendered as the main container component. For the passed props check the [Container Component Props](#container-component-props), please. |
| headerContainerComponent | component | `undefined` |  React component that should be rendered as the header container component. For the passed props check the [Header Container Component Props](#header-container-component-props), please.|
| headerCellContentComponent | component | `undefined` | React component that should be rendered as the header cell content component. For the passed props check the [Header Cell Content Component Props](#header-cell-content-component-props), please. |
| bodyContainerComponent | component | `undefined` | React component that should be rendered as the main body container component. For the passed props check the [Body Container Component Props](#body-container-component-props), please. |
| bodyCellContentComponent | component | `undefined` | React component that should be rendered as the cell content component. For the passed props check the [Body Cell Content Component Props](#body-cell-content-component-props), please. |
| containerClassName | string | `''` | Classname(s) that should applied to the calendar container element. |
| headerContainerClassName | string | `''` | Classname(s) that should applied to the header container element. |
| headerRowClassName | string | `''` | Classname(s) that should applied to the header row (list) element. |
| headerCellClassName | string | `''` | Classname(s) that should applied to the header cell (list item) element. |
| headerCellContentClassName | string | `''` | Classname(s) that should applied to the header cell content element. |
| bodyContainerClassName | string | `''` | Classname(s) that should applied to the body container element. |
| bodyRowClassName | string | `''` | Classname(s) that should applied to the body row (list) element. |
| bodyCellClassName | string | `''` | Classname(s) that should applied to the cell (list item) element. |
| bodyCellContentClassName | string | `''` | Classname(s) that should applied to the cell content element. |

#### Cell Data Object
| Prop name | Type | Description |
| --- | --- | --- |
| key | `string` | Identifier that created from the number of week and day of the week. |
| date | `Date` | Actual Date object. |
| day | `string` | Day of the month formatted with the provided `locale` prop as `2-digit` day. |
| month | `string` | Month from the actual date formatted with the provided `locale` prop as `short` month. |
| year | `string` | Year from the actual date formatted with the provided `locale` prop as `numeric` year. |
| isFirstDayOfYear | `boolean` | Describes whether the day is the first day of the year or not. |
| isMonthEven | `boolean` | Describes whether the month of the actual date is even or not. |
| isFirstDayOfMonth | `boolean` | Describes whether the actual date is the first day of the month or not. |
| isLastDayOfMonth | `boolean` | Describes whether the actual date is the last day of the month or not. |
| isToday | `boolean` | Describes whether the actual date is the same date as today or not. |
| isWeekend | `boolean` | Describes whether the actual date is on weekend or not. |

#### Header Cell Data Object
| Prop name | Type | Description |
| --- | --- | --- |
| key | `number` | Identifier that created from the day of the week. |
| short | `string` | Day of the week formatted with the provided `locale` prop as `short` weekday. |
| long | `string` | Day of the week formatted with the provided `locale` prop as `long` weekday. |
| narrow | `string` | Day of the week formatted with the provided `locale` prop as `narrow` weekday. |

#### Container Component Props
| Prop name | Type | Description |
| --- | --- | --- |
| children | `React.ReactNode` | All the underlaying elements that needs to be rendered to show the calendar content. |
| className | `string` | Merged classnames that includes the default one and the given one from `containerClassName` prop. |
| height | `number` or `'100%'` or `'auto'` | The same height prop that is given for the main component as a prop. |

#### Header Container Component Props
| Prop name | Type | Description |
| --- | --- | --- |
| children | `React.ReactNode` | All the underlaying elements that needs to be rendered to show the header content. |
| className | `string` | Merged classnames that includes the default one and the given one from `headerContainerClassName` prop. |

#### Header Cell Content Component Props
| Prop name | Type | Description |
| --- | --- | --- |
| data | [Header Cell Data Object](#header-cell-data-object) | The day of the week data structure that should be rendered. |
| className | `string` | Merged classnames that includes the default one and the given one from `headerCellContentClassName` prop. |

#### Body Container Component Props
| Prop name | Type | Description |
| --- | --- | --- |
| children | `React.ReactNode` | All the underlaying elements that needs to be rendered to show the body content. |
| className | `string` | Merged classnames that includes the default one and the given one from `bodyContainerClassName` prop. |

#### Body Cell Content Component Props
| Prop name | Type | Description |
| --- | --- | --- |
| data | [Cell Data Object](#cell-data-object) | The actual date data structure that should be rendered in the cell. |
| className | `string` | Merged classnames that includes the default one and the given one from `bodyCellContentClassName` prop. |

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
