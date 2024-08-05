import Frame from "@/interfaces/backend/Frame.ts";
import Component from "@/interfaces/backend/Component.ts";
import ComponentStyle from "@/interfaces/backend/ComponentStyle";

function useSimpleFrame(): Frame {
  return {
    lineNumber: [35],
    consoleLogs: "",
    components: [
      {
        type: "Graph",
        nodes: [0, 3, 9, 1, 2, 5, 4, 7, 6, 8],
        edges: [
          [0, 3], [0, 9], [3, 1], [3, 2],
          [9, 1], [9, 8], [2, 5], [4, 7],
          [7, 8], [6, 8]
        ],
        style: {
          nodeColors: {
            0: "DeepSkyBlue", 3: "DeepSkyBlue", 9: "DeepSkyBlue",
            1: "DeepSkyBlue", 2: null, 5: null, 4: null,
            7: null, 6: "DeepSkyBlue", 8: "DeepSkyBlue"
          },
        }
      }
    ]
  }
}

export { useSimpleFrame };
