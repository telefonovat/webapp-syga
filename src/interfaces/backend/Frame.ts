import Component from "./Component";
interface Frame {
  lineNumber: number[],
  consoleLogs: string,
  components: Component[],
};

export default Frame;
