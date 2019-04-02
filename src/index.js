import _ from 'lodash';
import Vue from 'vue';
import axios from 'axios';

let windowUrl = window.location.hash

if (windowUrl ==="#edit"){
  load()
}



function load(){

  var container = document.createElement('div');
  container.setAttribute("id", "app");
  document.body.appendChild(container);

  let editJsCss= Vue.component('edit-js-css',{
    props:{
      
    },
    data(){
      return {
        data: "Hello Side script"
      }
    },
    template: `
      <div>
        <h1>{{data}}</h1>
      </div>
    
    `
  })
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Magic Script Loaded',
      selectorId: null,
      containerStyle:{
        "position": "fixed",
        "left": "0",
        "bottom": "0",
        "width": "100%",
        "text-align": "center",
        "background-color": "#ff6100",
        "padding-bottom":"30px"
      },
      changesMade:[]
    },
    template:`
      <div>
      <div v-bind:style="containerStyle">
          <h1>{{message}} {{selectorId}}</h1>
          <div v-if="selectorId">
            <button @click.prevent="deleteNode()">Remove</button>
            <button @click.prevent = "editNode()"> Edit</button>
          </div>
          <div v-if="isPublishButtonShow">
            <button @click.prevent = "publish()"> Publish</button>
          </div>
      </div>
        <edit-js-css></edit-js-css>
      </div>
    `,
    computed:{
      isPublishButtonShow : function(){
        let flag = this.changesMade.length ? true : false;
        return flag
      }
    },
    methods: {
      setDataArrtibute(element, id){
        element.setAttribute('data-mzs-id', id)
        element.addEventListener('click', this.contentEditable )
        element.addEventListener('dblclick', this.removeEditElement )
      },
      createIDs(children, ids){
      
        Array.from(children)
        .map((element, index) => {
  
          let isChild = element.children
          if (isChild.length){
            this.createIDs(element.children, ids*10 + index+1)
          }
          if (ids !== null){
            this.setDataArrtibute(element, ids*10 + index+1);
          } else {
            this.setDataArrtibute(element, index+1);
          }
          
        })
      },
      getElementByDataAttribute(value){
        let selector = `[data-mzs-id="${value}"]`;
        
          return document.querySelector(selector);
      },
      deleteRow(){
        let elem = this.getElementByDataAttribute(this.id);
          elem && elem.remove()
      },
      createElem(elem){
        
      },
      contentEditable(event){
       event.stopPropagation();
       if(event.target){
         this.selectorId = event.target.getAttribute("data-mzs-id");
         
         if (this.previous && event.target !== this.previous){
           this.previous.contentEditable = false
           this.previous.classList && (this.previous.classList.remove("mz_edit_element"))
           if (document.getElementById('edit_mz_box_icon')){
             document.getElementById('edit_mz_box_icon').remove()
           }
         }
         if (event.target !== this.previous){
          event.target.contentEditable = true
          event.target.classList.add("mz_edit_element");
          
          //let editElement = document.createElement('div')
          //event.target.appendChild(editElement)
          //this.createElem(editElement);
          this.previous = event.target;
         }
       }
      },
      removeEditElement(event){
        event.stopPropagation();
        event.target.contentEditable = false
        event.target.classList && (event.target.classList.remove("mz_edit_element"))
        if (document.getElementById('edit_mz_box_icon')){
             document.getElementById('edit_mz_box_icon').remove()
        }
        this.previous = null
        this.selectorId= null
      },
      deleteNode(){
        // let element = document.getElementById('edit_mz_box_icon');
        // let parentElement= element.parentElement;
        // let elementId = parentElement.getAttribute("data-mzs-id")
        // console.log('id got deleted',elementId)
        // parentElement.remove();
        let element = this.getElementByDataAttribute(this.selectorId);
        console.log(element);
        element.remove();
        this.changesMade.push({ selectorId : this.selectorId, operationType: "removeNode"});
        console.log(this.changesMade);
      },
      editNode(){
        // let element = document.getElementById('edit_mz_box_icon');
        // let parentElement= element.parentElement;
        // let elementId = parentElement.getAttribute("data-mzs-id");
        // let elementText = parentElement.textContent;
        // parentElement.contentEditable = false
        // document.getElementById('edit_mz_box_icon').remove()
        let element = this.getElementByDataAttribute(this.selectorId);
        let elementText = element.textContent
        console.log(`the id ${this.selectorId} text got changed to :: ${elementText}`);
        this.selectorId = null
        this.changesMade.push({ selectorId : this.selectorId, operationType: "editText" , editedText: elementText})
        console.log(this.changesMade);
    },
    publish(){
      console.log(this.changesMade)
    }
  
    }, 
    created(){
      this.createIDs(document.body.children, null);
    },
    components:{
      "edit-js-css": editJsCss
    }
  })
}


