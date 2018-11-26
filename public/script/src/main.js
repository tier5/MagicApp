import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import Router from 'vue-router';
import VueCookie from 'vue-cookie';
import Moment from 'moment';

Vue.use(Router)
var node = document.createElement("div");
node.id = 'dynamicId';
document.body.appendChild(node);

Vue.use(VueCookie);
Vue.use(VueResource);
Vue.prototype.$moment = Moment;

new Vue({
  el: '#dynamicId',
  render: h => h(App)
})
