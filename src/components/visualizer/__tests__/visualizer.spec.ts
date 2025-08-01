import AlgorithmView from "@/views/AlgorithmView.vue";
import { createPinia, setActivePinia } from "pinia";
import { screen, render, within } from "@testing-library/vue";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";
import Visualizer from "../Visualizer.vue";
import { createTestingPinia } from "@pinia/testing";
import { VisualizationFrame } from "@telefonovat/syga--contract";
import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
import { nextTick } from "vue";
const vuetify = createVuetify({
  components,
  directives,
});

const testFrame: VisualizationFrame = {
  lineNo: [10],
  consoleLogs: [""],
  graphComponents: [
    {
      type: 1,
      vertices: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
        {
          id: 6,
        },
        {
          id: 7,
        },
        {
          id: 8,
        },
        {
          id: 9,
        },
        {
          id: 10,
        },
        {
          id: 11,
        },
        {
          id: 12,
        },
        {
          id: 13,
        },
        {
          id: 14,
        },
        {
          id: 15,
        },
        {
          id: 16,
        },
      ],
      edges: [
        {
          start: {
            id: 1,
          },
          end: {
            id: 2,
          },
        },
        {
          start: {
            id: 2,
          },
          end: {
            id: 3,
          },
        },
        {
          start: {
            id: 3,
          },
          end: {
            id: 4,
          },
        },
        {
          start: {
            id: 4,
          },
          end: {
            id: 5,
          },
        },
        {
          start: {
            id: 5,
          },
          end: {
            id: 6,
          },
        },
        {
          start: {
            id: 6,
          },
          end: {
            id: 7,
          },
        },
        {
          start: {
            id: 7,
          },
          end: {
            id: 8,
          },
        },
        {
          start: {
            id: 8,
          },
          end: {
            id: 9,
          },
        },
        {
          start: {
            id: 9,
          },
          end: {
            id: 10,
          },
        },
        {
          start: {
            id: 10,
          },
          end: {
            id: 11,
          },
        },
        {
          start: {
            id: 11,
          },
          end: {
            id: 12,
          },
        },
        {
          start: {
            id: 12,
          },
          end: {
            id: 13,
          },
        },
        {
          start: {
            id: 13,
          },
          end: {
            id: 14,
          },
        },
        {
          start: {
            id: 14,
          },
          end: {
            id: 15,
          },
        },
        {
          start: {
            id: 15,
          },
          end: {
            id: 16,
          },
        },
      ],
      style: {
        vertexColors: {
          "1": "#db5f57ff",
          "2": "#db9057ff",
          "3": "#dbc257ff",
          "4": "#c3db57ff",
          "5": "#91db57ff",
          "6": "#5fdb57ff",
          "7": "#57db80ff",
          "8": "#57dbb2ff",
        },
        edgeColors: {
          "1": {
            "2": "#db5f57ff",
          },
          "2": {
            "3": "#db9457ff",
          },
          "3": {
            "4": "#dbc957ff",
          },
          "4": {
            "5": "#b9db57ff",
          },
          "5": {
            "6": "#84db57ff",
          },
          "6": {
            "7": "#57db5fff",
          },
          "7": {
            "8": "#57db94ff",
          },
        },
        vertexShapes: {},
        edgeShapes: {},
        vertexLabels: {
          "1": "h",
          "2": "e",
          "3": "l",
          "4": "l",
          "5": "o",
          "6": ",",
          "7": " ",
          "8": "s",
          "9": "t",
          "10": "r",
          "11": "a",
          "12": "n",
          "13": "g",
          "14": "e",
          "15": "r",
          "16": "!",
        },
        edgeLabels: {},
      },
    },
  ],
};

describe("Graph visualizer", async function () {
  // it("should display frame numbers correctly", async function () {
  //   const pinia = createPinia();
  //   const algorithmView = render(AlgorithmView, {
  //     global: {
  //       plugins: [pinia, vuetify],
  //     },
  //   });
  //
  //   const navigationPanel = within(
  //     algorithmView.getByTestId("visualizer-navigation-panel"),
  //   ).getByTestId();
  // });
  it("should render the component frame correctly and\
    display a label for each vertex", async function () {
    const pinia = createPinia();
    setActivePinia(pinia);
    const store = useVisualizerStore();

    store.setFrames([testFrame]);
    store.setActiveFrame(0);

    const visualizer = render(Visualizer, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    await nextTick();
    const vertexLabels =
      testFrame.graphComponents[0].style.vertexLabels;

    Object.entries(vertexLabels).forEach(([id, _label], _index) => {
      const vertex = visualizer.getByTestId(`graph-vertex-${id}`);
      expect(vertex).toBeVisible();
    });
  });
});
