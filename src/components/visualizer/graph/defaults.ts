//Default values for graph nodes and edges
type DefaultValues = {
  readonly [key: string]: string | number | boolean;
};

const defaultNodeSettings: DefaultValues = {
  color: '#555',
  shape: 'circle' as string,
  radius: 12 as number,
};

const defaultEdgeSettings: DefaultValues = {
  color: '#aaa' as string,
  shape: 'solid' as string,
  width: 3,
  isDirected: false,
};

const defaultRendererSettings: DefaultValues = {
  viewBoxSize: 400 as number,
};

export {
  defaultNodeSettings,
  defaultEdgeSettings,
  defaultRendererSettings,
};
