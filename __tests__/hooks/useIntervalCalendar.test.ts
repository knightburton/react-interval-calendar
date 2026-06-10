import { renderHook } from '@testing-library/react';
import useIntervalCalendar from '../../src/hooks/useIntervalCalendar';
import { registerScrollToCurrentDate, DEFAULT_INTERVAL_CALENDAR_ID } from '../../src/hooks/intervalCalendarController';

describe('useIntervalCalendar', () => {
  test('returns false when no calendar is registered', () => {
    const { result } = renderHook(() => useIntervalCalendar());

    expect(result.current.scrollToCurrentDate()).toBeFalsy();
  });

  test('calls the registered calendar scroll handler when available', () => {
    const scrollToCurrentDate = jest.fn();
    const unregister = registerScrollToCurrentDate(DEFAULT_INTERVAL_CALENDAR_ID, scrollToCurrentDate);
    const { result } = renderHook(() => useIntervalCalendar());

    const triggered = result.current.scrollToCurrentDate();

    expect(triggered).toBeTruthy();
    expect(scrollToCurrentDate).toHaveBeenCalledTimes(1);

    unregister();
  });

  test('calls the unregistered calendar scroll handler', () => {
    const scrollToCurrentDate = jest.fn();
    const unregister = registerScrollToCurrentDate(DEFAULT_INTERVAL_CALENDAR_ID, scrollToCurrentDate);
    const { result } = renderHook(() => useIntervalCalendar('some-id'));

    const triggered = result.current.scrollToCurrentDate();

    expect(triggered).toBeFalsy();
    expect(scrollToCurrentDate).toHaveBeenCalledTimes(0);

    unregister();
  });

  test('targets a specific instance by instance id', () => {
    const defaultScroll = jest.fn();
    const secondaryScroll = jest.fn();
    const unregisterDefault = registerScrollToCurrentDate(DEFAULT_INTERVAL_CALENDAR_ID, defaultScroll);
    const unregisterSecondary = registerScrollToCurrentDate('secondary', secondaryScroll);
    const { result } = renderHook(() => useIntervalCalendar('secondary'));

    const triggered = result.current.scrollToCurrentDate();

    expect(triggered).toBeTruthy();
    expect(defaultScroll).not.toHaveBeenCalled();
    expect(secondaryScroll).toHaveBeenCalledTimes(1);

    unregisterDefault();
    unregisterSecondary();
  });
});
