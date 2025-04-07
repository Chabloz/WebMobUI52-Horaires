import { createApp } from 'vue';
import { Quasar } from 'quasar';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

import App from './App.vue';

const myApp = createApp(App);

myApp.use(Quasar, {
  config: {
    brand: {
      primary: '#451ba8',
      secondary: '#7b26a6',
      accent: '#9C27B0',
      dark: '#1d1d1d',
      'dark-page': '#121212',
      positive: '#54cd6e',
      negative: '#b32233',
      info: '#2490a6',
      warning: '#dbc074',
    }
  },
  plugins: {},
});

myApp.mount('#app');