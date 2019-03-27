import _ from 'lodash';
import newInstance from './vue_instance.js';
function component() {
  let element = document.createElement('mynewcomponent');
  element.innerHTML = _.join(['Hello', 'Word'], ' ');

  return element;
}
console.log('basic setup for creating any script for doing something in client side');
document.body.appendChild(component());
