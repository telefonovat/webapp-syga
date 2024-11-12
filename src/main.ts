import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import VueCodeMirror from 'vue-codemirror';
import { basicSetup } from 'codemirror';
import './style.css';
import './common.css';
import App from './App.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
});

createApp(App)
  .use(VueCodeMirror, { extensions: [basicSetup] })
  .use(vuetify)
  .use(pinia)
  .use(router)
  .mount('#app');
