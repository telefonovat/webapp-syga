import FeaturedAlgorithms from "@/components/user/dashboard/FeaturedAlgorithms.vue";
import { useAuthStore } from "@/store/user/authStore";
import HomeLayout from "@/views/HomeLayout.vue";
import UserPageView from "@/views/UserPageView.vue";
import LogInPageView from "@/views/LogInPageView.vue";
import {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteRecordRaw,
} from "vue-router";
import AlgorithmView from "@/views/algorithmView/AlgorithmView.vue";
import { getAlgorithmDetail } from "@/store/editor/getAlgorithmDetail";
import { useEditorStore } from "@/store/editor/editorStore";

const mandateSignIn = async function (
  _to: RouteLocationNormalizedGeneric,
  _from: RouteLocationNormalizedGeneric,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore();
  //TODO: Temporary measure. I should centralize initialization
  await authStore.verifyAuth();
  if (!authStore.isAuthenticated) {
    return next({
      name: "signin",
    });
  }

  next();
};

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
      beforeEnter: mandateSignIn,
    },
    {
      path: "/:username/algorithms",
      name: "user-page-view",
      components: {
        main: UserPageView,
      },
      beforeEnter: mandateSignIn,
      props: {
        main: (route) => ({
          targetUsername: route.params.username,
        }),
      },
    },
    {
      path: "/algorithm/:uuid",
      name: "algorithm-detail-view",
      components: {
        main: AlgorithmView,
      },
      beforeEnter: async (to, _from, next) => {
        const algorithmDetail = await getAlgorithmDetail(
          //WARN: Safety?
          to.params.uuid as string,
        );
        const editorStore = useEditorStore();
        editorStore.algorithmData = {
          // TODO: Wrong!
          isPublic: true,
          name: algorithmDetail.name,
          uuid: algorithmDetail.uuid,
        };
        editorStore.code = algorithmDetail.code;

        next();
      },
    },
  ],
};
