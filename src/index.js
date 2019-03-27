import _ from 'lodash';
import Vue from 'vue'

var container = document.createElement('div');
container.setAttribute("id", "app");
document.body.appendChild(container);

var app = new Vue({
  el: '#app',
  data: {
    message: 'Magic App Script loaded Successfully'
  }
})
