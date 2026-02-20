import MockComponent from "@/components/mock/sfc/MockComponent.vue";
import type { RouterOptions } from "vue-router";
import { homeLayoutRouterRecord } from "./homeLayoutRoutes";
import ImmediateFeedbackView from "@/views/exercises/immediateFeedback/ImmediateFeedbackView.vue";
import ExercisesOverview from "@/views/exercises/ExercisesOverview.vue";
import ApplyExerciseView from "@/views/exercises/apply/ApplyExerciseView.vue";
export const routes: RouterOptions["routes"] = [
  homeLayoutRouterRecord,
  {
    path: "/if/:exerciseId",
    name: "ImmediateFeedback",
    component: ImmediateFeedbackView,
    props: true,
  },
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
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: MockComponent,
  },
];
