import AlgorithmView from '@/views/AlgorithmView.vue';
import NavSidebar from '@/components/NavSidebar.vue';
import HomeLayout from '@/views/HomeLayout.vue';
import type { RouterOptions } from 'vue-router';
export const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'HomeLayout',
    component: HomeLayout,
    children: [
      {
        //View both the code and visualization of algorithm
        path: '',
        name: 'AlgorithmView',
        components: {
          main: AlgorithmView,
          sidebar: NavSidebar,
        },
      },
    ],
  },
];
