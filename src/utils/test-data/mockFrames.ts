import Frame from "@/interfaces/backend/Frame.ts";

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
          edgeColors: {
            0: { 3: "DeepSkyBlue", 9: null },
            3: { 1: "DeepSkyBlue", 2: null },
            9: { 1: "DeepSkyBlue", 8: "DeepSkyBlue" },
            2: { 5: null },
            4: { 7: null },
            7: { 8: null },
            6: { 8: "DeepSkyBlue" }
          }
        }
      }
    ]
  }
}

function useSimpleAnimation(): Frame[] {
  return [
    {
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
            edgeColors: {
              0: { 3: "DeepSkyBlue", 9: null },
              3: { 1: "DeepSkyBlue", 2: null },
              9: { 1: "DeepSkyBlue", 8: "DeepSkyBlue" },
              2: { 5: null },
              4: { 7: null },
              7: { 8: null },
              6: { 8: "DeepSkyBlue" }
            }
          }
        }
      ]
    },
    {
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
              0: "Red", 3: "Red", 9: "Red",
              1: "Red", 2: null, 5: null, 4: null,
              7: null, 6: "Red", 8: "Red"
            },
            edgeColors: {
              0: { 3: "Red", 9: null },
              3: { 1: "Red", 2: null },
              9: { 1: "Red", 8: "Red" },
              2: { 5: null },
              4: { 7: null },
              7: { 8: null },
              6: { 8: "Red" }
            }
          }
        }
      ]
    },
    {
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
              0: "Green", 3: "Red", 9: "Red",
              1: "Green", 2: null, 5: null, 4: null,
              7: null, 6: "Green", 8: "Red"
            },
            edgeColors: {
              0: { 3: "Green", 9: null },
              3: { 1: "Green", 2: null },
              9: { 1: "Green", 8: "Red" },
              2: { 5: null },
              4: { 7: null },
              7: { 8: null },
              6: { 8: "Green" }
            }
          }
        }
      ]
    }
  ]
}
export { useSimpleFrame, useSimpleAnimation };
