import AlgorithmView from '@/views/AlgorithmView.vue';
import NavSidebar from '@/components/NavSidebar.vue';
import HomeLayout from '@/views/HomeLayout.vue';
import ProfileView from '@/views/ProfileView.vue';
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
      {
        //Modify settings
        path: '/settings',
        name: 'UserSettings',
        components: {
          main: AlgorithmView,
          sidebar: NavSidebar,
        },
      },
      {
        //View profile if logged in
        path: '/users/:username',
        name: 'ProfileView',
        components: {
          main: ProfileView,
          sidebar: NavSidebar,
        },
      },
    ],
  },
];
