import MainLayout from "@/views/MainLayout.vue"
import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: MainLayout,
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export { router };
