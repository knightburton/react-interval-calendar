import { MutableRefObject } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { mockAllIsIntersecting } from '../testUtils';
import useOnScreen from '../../hooks/useOnScreen';

describe('useOnScreen', () => {
  test('returns false based on default values', () => {
    const refMock: MutableRefObject<Element | null> = { current: null };
    const { result } = renderHook(() => useOnScreen(refMock));

    expect(result.current).toBeFalsy();
  });

  test('returns false based on non intersecting values', () => {
    const refMock: MutableRefObject<Element | null> = { current: document.createElement('div') };
    const { result } = renderHook(() => useOnScreen(refMock));
    mockAllIsIntersecting(false);

    expect(result.current).toBeFalsy();
  });

  test('returns true based on intersecting values', () => {
    const refMock: MutableRefObject<Element | null> = { current: document.createElement('div') };
    const { result } = renderHook(() => useOnScreen(refMock));
    mockAllIsIntersecting(true);

    expect(result.current).toBeTruthy();
  });
});
