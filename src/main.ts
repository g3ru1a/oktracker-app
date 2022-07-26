import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from "axios";
import VueAxios from 'vue-axios';


import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { createI18n } from "vue-i18n";
import messages from './locales';

/* Store */
import { store, key } from "./store";

axios.defaults.baseURL = "https://dev.oktracker.com/api/v2";
axios.defaults.headers.common['Accept'] = 'application/json';
axios.interceptors.request.use(config => {
	if(store.state.authData != null){
		config.headers!['Authorization'] = `Bearer ${store.state.authData.token}`;
	}
	return config;
}, error => {return Promise.reject(error)});

const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
    //opt
	messages
});

router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresLogin) && store.state.authData == null){
		next('/login');
	}else{
		next();
	}
});

const app = createApp(App)
	.use(IonicVue)
	.use(router)
	.use(store, key)
	.use(i18n)
	.use(VueAxios, axios);

router.isReady().then(() => {
	app.mount('#app');
});