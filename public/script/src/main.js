import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
var node = document.createElement("div");
node.id = 'dynamicId';
document.body.appendChild(node);

Vue.use(VueResource);
new Vue({
  el: '#dynamicId',
  render: h => h(App)
})
