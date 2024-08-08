import { createMemoryHistory, createRouter } from "vue-router";

import Home from '@/views/Home.vue';
import ControlHeader from "@/components/visualizer/ControlHeader.vue"
const routes = [
  {
    path: '/',
    components: {
      default: Home,
    }
  }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
