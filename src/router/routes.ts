import MockComponent from "@/components/mock/sfc/MockComponent.vue";
import type { RouterOptions } from "vue-router";
import { homeLayoutRouterRecord } from "./homeLayoutRoutes";
import ImmediateFeedbackViewWrapper from "@/views/exercises/ifTemp/ImmediateFeedbackViewWrapper.vue";
import ExercisesOverview from "@/views/exercises/ExercisesOverview.vue";
import ApplyCyclesView from "@/views/exercises/apply/ApplyCyclesView.vue";
import ApplyBipartiteView from "@/views/exercises/apply/ApplyBipartiteView.vue";
import ApplySinglyConnectedView from "@/views/exercises/apply/ApplySinglyConnectedView.vue";
export const routes: RouterOptions["routes"] = [
  homeLayoutRouterRecord,
  {
    path: "/exercises",
    name: "ExerciesOverview",
    component: ExercisesOverview,
  },
  {
    path: "/exercise/week-2/practice-depth-first-search",
    name: "PracticeDepthFirstSearch",
    component: ImmediateFeedbackViewWrapper,
  },
  {
    path: "/exercise/week-2/singly-connected-graphs",
    name: "ApplySingleConnectedView",
    component: ApplySinglyConnectedView,
  },
  {
    path: "/exercise/week-3/cycles-are-fun",
    name: "ApplyExerciseView",
    component: ApplyCyclesView,
  },
  {
    path: "/exercise/week-3/is-it-bipartite",
    name: "ApplyBipartiteView",
    component: ApplyBipartiteView,
  },
  {
    path: "/exercise/week-3/practice-depth-first-search",
    name: "PracticeDepthFirstSearch",
    component: ImmediateFeedbackViewWrapper,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: MockComponent,
  },
];
