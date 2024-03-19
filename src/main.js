import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import './style.css';

loadFonts().then(() => {
	console.log('Fonts loaded');
});

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app');
