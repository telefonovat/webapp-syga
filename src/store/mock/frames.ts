import { Frame } from "@/shared/Frame";

const simpleGraph: Frame[] = [
  {
    lineNo: [0],
    consoleLogs: "",
    components:
      [{
        nodes: [1, 2, 3],
        edges: [],
        style: {
          nodeColors: {
            1: "red",
            2: "red",
            3: "red",
          }
        }
      }]
  }
];

export { simpleGraph };
