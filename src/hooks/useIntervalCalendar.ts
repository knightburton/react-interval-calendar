import { useCallback } from 'react';
import { DEFAULT_INTERVAL_CALENDAR_ID, triggerScrollToCurrentDate } from './intervalCalendarController';

export type UseIntervalCalendar = {
  scrollToCurrentDate: () => boolean;
};

const useIntervalCalendar = (id: string = DEFAULT_INTERVAL_CALENDAR_ID): UseIntervalCalendar => {
  const scrollToCurrentDate = useCallback((): boolean => {
    return triggerScrollToCurrentDate(id);
  }, [id]);

  return {
    scrollToCurrentDate,
  };
};

export default useIntervalCalendar;
