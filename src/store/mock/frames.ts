import { Frame } from "@/shared/Frame";

const simpleGraph: Frame[] = [
  {
    lineNo: [0],
    consoleLogs: "",
    components:
      [{
        nodes: [1, 2, 3],
        edges: [[1, 2], [2, 3]],
        style: {
          nodeColors: {
            1: "red",
            2: "red",
            3: "red",
          },
          edgeColors: {
            1: { 2: "blue" },
            2: { 3: "green" },
          },
        }
      }]
  }
];

export { simpleGraph };
