const DEFAULT_INTERVAL_CALENDAR_ID = 'ic-default-id';
const scrollToCurrentDateHandlers = new Map<string, () => void>();

export const registerScrollToCurrentDate = (id: string, handler: () => void): (() => void) => {
  scrollToCurrentDateHandlers.set(id, handler);

  return (): void => {
    if (scrollToCurrentDateHandlers.get(id) === handler) {
      scrollToCurrentDateHandlers.delete(id);
    }
  };
};

export const triggerScrollToCurrentDate = (id: string): boolean => {
  const handler = scrollToCurrentDateHandlers.get(id);
  if (!handler) return false;
  handler();
  return true;
};

export { DEFAULT_INTERVAL_CALENDAR_ID };
