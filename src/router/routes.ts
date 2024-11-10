import AlgorithmView from '@/views/AlgorithmView.vue';
import MockComponent from '@/components/mock/sfc/MockComponent.vue';
import HomeLayout from '@/views/HomeLayout.vue';
import type { RouterOptions } from 'vue-router';
export const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'HomeLayout',
    component: HomeLayout,
    children: [
      {
        path: '',
        name: 'AlgorithmView',
        components: {
          main: AlgorithmView,
          sidebar: MockComponent,
        },
      },
    ],
  },
];
