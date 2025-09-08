import MockComponent from "@/components/mock/sfc/MockComponent.vue";
import type { RouterOptions } from "vue-router";
import { homeLayoutRouterRecord } from "./homeLayoutRoutes";
export const routes: RouterOptions["routes"] = [
  homeLayoutRouterRecord,
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: MockComponent,
  },
];
