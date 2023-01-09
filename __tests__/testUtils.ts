import { act } from '@testing-library/react';
import { BodyCellType } from '../src/types';

type Item = {
  callback: IntersectionObserverCallback;
  elements: Element[];
  created: number;
};

const observers = new Map<IntersectionObserver, Item>();

type OverridesType = {
  [key: string]: number | string | boolean | Date | undefined;
};

beforeEach(() => {
  global.IntersectionObserver = jest.fn((callback, options = {}) => {
    const item = {
      callback,
      elements: <Element[]>[],
      created: Date.now(),
    };

    const instance: IntersectionObserver = {
      thresholds: Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0],
      root: options.root || null,
      rootMargin: options.rootMargin || '',
      observe: jest.fn((element: Element) => item.elements.push(element)),
      unobserve: jest.fn(),
      disconnect: jest.fn(() => observers.delete(instance)),
      takeRecords: jest.fn(),
    };

    observers.set(instance, item);

    return instance;
  });
});

afterEach(() => {
  observers.clear();
});

const triggerIntersection = (trigger: boolean | number, observer: IntersectionObserver, item: Item): void => {
  const isIntersecting = typeof trigger === 'number' ? observer.thresholds.some(threshold => trigger >= threshold) : trigger;

  const intersectionRatio = typeof trigger === 'number' ? observer.thresholds.find(threshold => trigger >= threshold) || 0 : (trigger && 1) || 0;

  const entries: IntersectionObserverEntry[] = Array.from(item.elements).map(element => ({
    boundingClientRect: element.getBoundingClientRect(),
    intersectionRatio,
    intersectionRect: isIntersecting
      ? element.getBoundingClientRect()
      : {
          bottom: 0,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          width: 0,
          x: 0,
          y: 0,
          toJSON: () => {},
        },
    isIntersecting,
    rootBounds: null,
    target: element,
    time: Date.now() - item.created,
  }));

  act(() => item.callback(entries, observer));
};

export const mockAllIsIntersecting = (isIntersecting: boolean | number): void =>
  observers.forEach((item, observer) => {
    triggerIntersection(isIntersecting, observer, item);
  });

export const mockIntersectionInstance = (element: Element): IntersectionObserver | undefined =>
  Array.from(observers)?.find(observer => observer[1].elements.find(e => e === element))?.[0];

export const mockBodyCellAttributes = (overrides: OverridesType = {}): BodyCellType => ({
  key: '2-3',
  date: new Date(2021, 0, 18),
  day: '18',
  month: '1',
  year: '2021',
  isFirstDayOfYear: false,
  isMonthEven: false,
  isFirstDayOfMonth: false,
  isLastDayOfMonth: false,
  isToday: false,
  isWeekend: false,
  ...overrides,
});
