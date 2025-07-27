import AlgorithmView from "@/views/AlgorithmView.vue";
import { createPinia, setActivePinia } from "pinia";
import { render, within } from "@testing-library/vue";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";
const vuetify = createVuetify({
  components,
  directives,
});

const mockFrames = [
  {
    lineNo: [],
    consoleLogs: "log line 1",
    components: [
      {
        nodes: [1, 2, 3],
        edges: [
          [1, 2],
          [2, 3],
        ],
        style: {
          nodeColors: {
            "1": "white",
            "2": "white",
            "3": "white",
          },
          edgeColors: {
            "1": { "2": "black" },
            "2": { "3": "black" },
          },
          nodeLabels: {},
          edgeLabels: {},
          nodeShapes: {},
          edgeShapes: {},
        },
      },
    ],
  },

  {
    lineNo: [],
    consoleLogs: "log line 2",
    components: [
      {
        nodes: [1, 2, 3],
        edges: [
          [1, 2],
          [2, 3],
        ],
        style: {
          nodeColors: {
            "1": "black",
            "2": "white",
            "3": "white",
          },
          edgeColors: {
            "1": { "2": "black" },
            "2": { "3": "black" },
          },
          nodeLabels: {},
          edgeLabels: {},
          nodeShapes: {},
          edgeShapes: {},
        },
      },
    ],
  },
  {
    lineNo: [],
    consoleLogs: "",
    components: [
      {
        nodes: [1, 2, 3],
        edges: [
          [1, 2],
          [2, 3],
        ],
        style: {
          nodeColors: {
            "1": "black",
            "2": "black",
            "3": "white",
          },
          edgeColors: {
            "1": { "2": "white" },
            "2": { "3": "black" },
          },
          nodeLabels: {},
          edgeLabels: {},
          nodeShapes: {},
          edgeShapes: {},
        },
      },
    ],
  },
  {
    lineNo: [],
    consoleLogs: "",
    components: [
      {
        nodes: [1, 2, 3],
        edges: [
          [1, 2],
          [2, 3],
        ],
        style: {
          nodeColors: {
            "1": "black",
            "2": "black",
            "3": "black",
          },
          edgeColors: {
            "1": { "2": "white" },
            "2": { "3": "white" },
          },
        },
      },
    ],
  },
];

describe("Graph visualizer", async function () {
  it("should display frame numbers correctly", async function () {
    const pinia = createPinia();
    const algorithmView = render(AlgorithmView, {
      global: {
        plugins: [pinia, vuetify],
      },
    });

    const navigationPanel = within(
      algorithmView.getByTestId("visualizer-navigation-panel"),
    ).getByTestId();
  });
});
