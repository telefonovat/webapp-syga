import MockComponent from "@/components/mock/sfc/MockComponent.vue";
import type { RouterOptions } from "vue-router";
import { homeLayoutRouterRecord } from "./homeLayoutRoutes";
import ImmediateFeedbackViewWrapper from "@/views/exercises/ifTemp/ImmediateFeedbackViewWrapper.vue";
import ExercisesOverview from "@/views/exercises/ExercisesOverview.vue";
import ApplyExerciseView from "@/views/exercises/apply/ApplyExerciseView.vue";
import ApplyBipartiteView from "@/views/exercises/apply/ApplyBipartiteView.vue";
export const routes: RouterOptions["routes"] = [
  homeLayoutRouterRecord,
  {
    path: "/exercises",
    name: "ExerciesOverview",
    component: ExercisesOverview,
  },
  {
    path: "/exercise/week-3/cycles-are-fun",
    name: "ApplyExerciseView",
    component: ApplyExerciseView,
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
