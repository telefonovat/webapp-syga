import { expect, test } from "vitest"

import { defaultNodeSettings } from "@/components/visualizer/graph/defaults"

test("Default node settings are correct",
  () => {
    expect(defaultNodeSettings["color"]).toBe("#3498db");
  })
