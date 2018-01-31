import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource';
import router from './router'
import store from './store/index';
import Vuelidate from 'vuelidate';
import VuePaginate from 'vue-paginate';
import ToggleButton from 'vue-js-toggle-button';
import swal from 'sweetalert2';
import {RotateSquare2} from 'vue-loading-spinner'

Vue.use(ToggleButton)
Vue.use(VueResource);
Vue.use(Vuelidate);
Vue.use(VuePaginate);
Vue.use(RotateSquare2);
import config from '../config/config';
if(process.env.NODE_ENV =='development'){
  Vue.http.options.root = config.dev_url;
} else {
  Vue.http.options.root = config.prod_url;
}
Vue.config.productionTip = false
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Content-Type', 'application/json');
  request.headers.set('Authorization',localStorage.getItem('token'));
  next()
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
