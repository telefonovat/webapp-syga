import MockComponent from "@/components/mock/sfc/MockComponent.vue";
import type { RouterOptions } from "vue-router";
import { homeLayoutRouterRecord } from "./homeLayoutRoutes";
import ImmediateFeedbackView from "@/views/exercises/immediateFeedback/ImmediateFeedbackView.vue";
export const routes: RouterOptions["routes"] = [
  homeLayoutRouterRecord,
  {
    path: "/if",
    name: "ImmediateFeedback",
    component: ImmediateFeedbackView,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: MockComponent,
  },
];
