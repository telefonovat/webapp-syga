import { describe, expect, it, vi } from 'vitest';
import { useTicker } from './ticker';
import { createPinia } from 'pinia';
import { useAnimationStore_ } from './animationStore';
import { Frame } from '@/shared-types/visualization/Frame';

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

describe('Animation Store', () => {
  it('throws errors if frame movement is done when there are no frames', () => {
    const store = useAnimationStore_(createPinia());

    store.setFrames([]);

    expect(() => store.nextFrame()).toThrowError();
    expect(() => store.prevFrame()).toThrowError();
  });

  it('should cycle through frames correctly', () => {
    const store = useAnimationStore_(createPinia());

    const testFrames: Frame[] = [
      {
        lineNo: [],
        consoleLogs: 'frame 0',
        components: [],
      },
      {
        lineNo: [],
        consoleLogs: 'frame 1',
        components: [],
      },
      {
        lineNo: [],
        consoleLogs: 'frame 2',
        components: [],
      },
    ];

    store.setFrames(testFrames);

    expect(store.activeFrameNumber).toBe(0);
    expect(store.currentFrame?.consoleLogs).toBe('frame 0');

    store.nextFrame();
    expect(store.activeFrameNumber).toBe(1);
    expect(store.currentFrame?.consoleLogs).toBe('frame 1');

    store.nextFrame();
    expect(store.activeFrameNumber).toBe(2);
    expect(store.currentFrame?.consoleLogs).toBe('frame 2');

    store.prevFrame();
    expect(store.activeFrameNumber).toBe(1);
    expect(store.currentFrame?.consoleLogs).toBe('frame 1');
  });
});
