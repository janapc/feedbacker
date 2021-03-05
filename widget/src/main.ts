import { createApp } from 'vue';

import { setup } from './utils/boostrap';

import App from './App.vue';
import Playground from './views/Playground/index.vue';

import './assets/css/fonts.css';
import './assets/css/tailwind.css';

import 'animate.css';

setup({
  onDevelopment: () => {
    createApp(Playground).mount('#app');
  },
  onProduction: () => {
    createApp(App).mount('#app');
  }
});
