import Component from "./Component";
interface Frame {
  lineno: number[],
  consoleLogs: string,
  components: Component[],
};

export default Frame;
