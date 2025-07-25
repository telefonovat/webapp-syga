import { describe, expect, it, vi } from "vitest";
import { createPinia } from "pinia";
import { useAnimationStore_ } from "./animationStore";
import { Frame } from "@/shared-types/visualization/Frame";
import { useVisualizerStore } from "./visualizerStore";

const testFrames: Frame[] = [
  {
    lineNo: [0],
    consoleLogs: "frame 0",
    components: [],
  },
  {
    lineNo: [1],
    consoleLogs: "frame 1",
    components: [],
  },
  {
    lineNo: [2],
    consoleLogs: "frame 2",
    components: [],
  },
];

describe("Private Animation Store", () => {
  it("throws errors if frame movement is done when there are no frames", () => {
    const store = useAnimationStore_(createPinia());

    store.setFrames([]);

    expect(() => store.nextFrame()).toThrowError();
    expect(() => store.prevFrame()).toThrowError();
  });

  it("should cycle through frames correctly", () => {
    const store = useAnimationStore_(createPinia());

    store.setFrames(testFrames);

    expect(store.activeFrameNumber).toBe(0);
    expect(store.currentFrame?.consoleLogs).toBe("frame 0");

    store.nextFrame();
    expect(store.activeFrameNumber).toBe(1);
    expect(store.currentFrame?.consoleLogs).toBe("frame 1");

    store.nextFrame();
    expect(store.activeFrameNumber).toBe(2);
    expect(store.currentFrame?.consoleLogs).toBe("frame 2");

    store.prevFrame();
    expect(store.activeFrameNumber).toBe(1);
    expect(store.currentFrame?.consoleLogs).toBe("frame 1");
  });
});

describe("Visualizer Store", () => {
  it("should set active frame number correctly", () => {
    const store = useVisualizerStore(createPinia());

    expect(store.activeFrameNumber).toEqual(0);

    store.setFrames(testFrames);
    store.setActiveFrame(testFrames.length - 1);
    expect(store.activeFrameNumber).toEqual(testFrames.length - 1);
  });

  it("should set frames correctly", () => {
    const store = useVisualizerStore(createPinia());

    expect(store.frames).toEqual([]);

    store.setFrames(testFrames);

    expect(store.frames).toEqual(testFrames);
  });
});
