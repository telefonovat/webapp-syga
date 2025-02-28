import { describe, expect, it, vi } from 'vitest';
import { useTicker } from './ticker';
import { createPinia } from 'pinia';

describe('Ticker store', () => {
  it('should not tick before tick period ends', () => {
    const store = useTicker(createPinia());

    vi.useFakeTimers();
    vi.setSystemTime(new Date());

    store.lastTick = Date.now();

    vi.advanceTimersByTime(store.tickPeriod_ / 2);
    expect(store.shouldDoTick(Date.now())).toBe(false);

    vi.advanceTimersByTime(store.tickPeriod_ / 2);
    expect(store.shouldDoTick(Date.now())).toBe(true);

    vi.useRealTimers();
  });
});
