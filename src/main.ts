import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import VueCodeMirror from 'vue-codemirror';
import { basicSetup } from 'codemirror';
import './style.css';
import App from './App.vue';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App)
  .use(VueCodeMirror, { extensions: [basicSetup] })
  .use(vuetify)
  .use(pinia)
  .use(router)
  .mount('#app');
