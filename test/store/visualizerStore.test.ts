import { useVisualizerStore } from '@/store/visualizer/visualizerStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

describe('Visualizer Store', () => {
  let store: ReturnType<typeof useVisualizerStore>;
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useVisualizerStore();
  });

  it('Initial active frame is 0', () => {
    expect(store.activeFrameNumber).toBe(0);
  });

  it.skip('Incrementing and decrementing frame', () => {
    vi.spyOn(store, 'numberOfFrames', 'get').mockReturnValue(20);
    for (let i = 1; i < 10; i++) {
      store.setActiveFrame(store.activeFrameNumber + i);
      expect(store.activeFrameNumber).toBe(
        store.activeFrameNumber + i
      );
    }

    store.setActiveFrame(15);
    for (let i = -1; i >= -10; i--) {
      store.setActiveFrame(store.activeFrameNumber + i);
      expect(store.activeFrameNumber).toBe(store);
    }
  });

  it.skip('Out of bounds increments and decrements are illegal', () => {
    vi.spyOn(store, 'numberOfFrames', 'get').mockReturnValue(20);

    store.setActiveFrame(0);
    store.setActiveFrame(store.activeFrameNumber - 1);
    expect(store.activeFrameNumber).toBe(0);

    store.setActiveFrame(19);
    store.setActiveFrame(store.activeFrameNumber + 1);
    expect(store.activeFrameNumber).toBe(19);
  });
});
