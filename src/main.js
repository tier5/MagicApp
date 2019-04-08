import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import VueResource from 'vue-resource';
import Vuelidate from 'vuelidate';
import VueClipboards from 'vue-clipboards';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import VueAnimate from 'vue-animate-scroll';
// import './registerServiceWorker';

import '../node_modules/jquery/dist/jquery';
import '../node_modules/lity/dist/lity.min.css';
import '../node_modules/lity/dist/lity.min.js';

Vue.config.productionTip = true;
Vue.use(VueResource);
Vue.use(Vuelidate);
Vue.use(VueClipboards);
Vue.use(VueAnimate);

if (process.env.NODE_ENV ==='development') {
  Vue.backend_url = process.env.VUE_APP_DEV_API_ENDPOINT;
  Vue.http.options.root = process.env.VUE_APP_DEV_API_ENDPOINT;
} else {
  Vue.backend_url = process.env.VUE_APP_PROD_API_ENDPOINT;
  Vue.http.options.root = process.env.VUE_APP_PROD_API_ENDPOINT;
}


Vue.http.interceptors.push((request, next) => {
  request.headers.set('Content-Type', 'application/json');
  request.headers.set('Authorization',localStorage.getItem('token'));
  next((response)=>{
    if (response.status === 401){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/')
    }
  })
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
