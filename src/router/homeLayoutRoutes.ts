import HomeLayout from "@/views/HomeLayout.vue";
import { RouteRecordRaw } from "vue-router";
import AlgorithmView from "@/views/algorithmView/AlgorithmView.vue";
export const homeLayoutRouterRecord: RouteRecordRaw = {
  path: "/",
  name: "HomeLayout",
  component: HomeLayout,
  children: [
    {
      //View both the code and visualization of algorithm
      path: "",
      name: "algorithm-view",
      components: {
        main: AlgorithmView,
      },
    },
  ],
};
