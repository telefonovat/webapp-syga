import FeaturedAlgorithms from "@/components/user/dashboard/FeaturedAlgorithms.vue";
import { useAuthStore } from "@/store/user/authStore";
import AlgorithmView from "@/views/AlgorithmView.vue";
import HomeLayout from "@/views/HomeLayout.vue";
import LogInPageView from "@/views/LogInPageView.vue";
import { RouteRecordRaw } from "vue-router";

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
        // sidebar: NavSidebar,
      },
    },
    {
      path: "/featured",
      name: "featured-algorithms",
      components: {
        main: AlgorithmView,
        extra: FeaturedAlgorithms,
      },
    },
    {
      path: "/signin",
      name: "signin",
      components: {
        main: LogInPageView,
      },
    },
    {
      path: "/settings",
      name: "user-settings",
      components: {
        main: AlgorithmView,
      },
      beforeEnter: (_to, _from, next) => {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated) {
          return next({
            name: "signin",
          });
        }

        next();
      },
    },
    // {
    //   //View profile if logged in
    //   path: "/users/:username",
    //   name: "ProfileView",
    //   components: {
    //     main: ProfileView,
    //     // sidebar: NavSidebar,
    //   },
    // },
    // {
    //   path: "users/view/:username",
    //   name: "MockUser",
    //   components: {
    //     main: UserProfile,
    //   },
    //   props: true,
    // },
  ],
};
