type DefaultValues = {
  readonly [key: string]: string | number;
};

const defaultNodeSettings: DefaultValues = {
  color: "#3498db",
  shape: "circle",
  radius: 30,
};

const defaultEdgeSettings: DefaultValues = {
  color: "#aaa" as string,
  shape: "solid" as string,
  width: 10,
};

export { defaultNodeSettings, defaultEdgeSettings };
