import { Frame } from '@/shared-types/visualization/Frame';
import { useVisualizerStore } from '@/store/visualizer/visualizerStore';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { useRenderData } from '../graph/renderData';
import { mockedStore } from '@/types/mock/mockedStore';

describe('Test useRenderdata composable', () => {
  const testFrame: Frame = {
    lineNo: [],
    consoleLogs: '',
    components: [
      {
        type: 'Graph',
        nodes: [1, 2, 3],
        edges: [
          [1, 2],
          [2, 3],
        ],
        style: {
          nodeColors: {
            '1': 'white',
            '2': 'white',
            '3': 'white',
          },
          edgeColors: {
            '1': { '2': 'black' },
            '2': { '3': 'black' },
          },
          nodeLabels: {},
          edgeLabels: {},
          nodeShapes: {},
          edgeShapes: {},
        },
      },
    ],
  };
  it('extracts frame properties from the store correctly', () => {
    setActivePinia(createTestingPinia());
    const store = mockedStore(useVisualizerStore);

    store.currentFrame = testFrame;

    const {
      nodes,
      edges,
      type,
      nodeColors,
      nodeLabels,
      nodeShapes,
      edgeColors,
      edgeShapes,
      edgeLabels,
    } = useRenderData(0, 200);

    expect(type).toBe(testFrame.components[0].type);

    expect(nodes).toBe(testFrame.components[0].nodes);
    expect(edges).toBe(testFrame.components[0].edges);

    expect(nodeColors).toBe(testFrame.components[0].style.nodeColors);
    expect(nodeLabels).toBe(testFrame.components[0].style.nodeLabels);
    expect(nodeShapes).toBe(testFrame.components[0].style.nodeShapes);

    expect(edgeColors).toBe(testFrame.components[0].style.edgeColors);
    expect(edgeLabels).toBe(testFrame.components[0].style.edgeLabels);
    expect(edgeShapes).toBe(testFrame.components[0].style.edgeShapes);
  });
});
