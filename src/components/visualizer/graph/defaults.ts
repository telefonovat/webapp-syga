//Default values for graph nodes and edges
type DefaultValues = {
  readonly [key: string]: string | number;
};

const defaultNodeSettings: DefaultValues = {
  color: '#555',
  shape: 'circle' as string,
  radius: 20 as number,
};

const defaultEdgeSettings: DefaultValues = {
  color: '#aaa' as string,
  shape: 'solid' as string,
  width: 5,
};

const defaultRendererSettings: DefaultValues = {
  viewBoxSize: 400 as number,
};

export {
  defaultNodeSettings,
  defaultEdgeSettings,
  defaultRendererSettings,
};
