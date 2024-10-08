import { simpleGraph } from "@/store/mock/frames";
import { useAnimationStore_ } from "@/store/visualizer/animationStore";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, test } from "vitest";

describe("Animation", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Initial state", () => {
    const store_ = useAnimationStore_();
    expect(store_.frames_).toStrictEqual([]);
    expect(store_.activeFrame).toBe(0);
    expect(store_.nFrames).toBe(0);
  });

  test("Frame increment and decrement", () => {
    const store_ = useAnimationStore_();

    //Empty frames
    expect(() => store_.nextFrame()).toThrowError();
    expect(() => store_.prevFrame()).toThrowError();

    //Frames on a simple graph of size 3
    store_.setFrames(simpleGraph);
    expect(store_.nFrames).toEqual(simpleGraph.length);
    store_.nextFrame();
    expect(store_.activeFrame)
      .toEqual(1 % simpleGraph.length);
    store_.prevFrame();
    expect(store_.activeFrame)
      .toEqual(0 % simpleGraph.length);
    store_.prevFrame();
    expect(store_.activeFrame)
      .toEqual(-1 % simpleGraph.length);


  });


})
