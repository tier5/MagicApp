<template>
  <div id="app">
  </div>
</template>

<script>
export default {
  data () {
    return {
			msg: 'Welcome to Your Vue.js App',
			postUrl: 'https://amagiczap.com/api/script-data'
    }
  },
	mounted(){
		var scriptElement = document.getElementById('magic_app_script');
    var zapId = scriptElement.getAttribute('data-script-id')
		var elements = document.getElementsByName('fname');
			this.$http.get(this.postUrl+'/'+ zapId).then(res=> {
				let attributes = res.body.attributes; 
				let trueIdsandValue =[]; // {id : name , value :'test'}
				let params = this.getAllParams();
				if (attributes.length){
					attributes.forEach(element => {
						for(let props in params){
							if(element.attribute_name == props){
								trueIdsandValue.push({
									id : element.attribute_name,
									value : params[props],
									type : element.attribute_type
								})
							}
						}
					});
				}
				if (trueIdsandValue.length) {
					trueIdsandValue.forEach(elem => {
						this.isElementIsInput(elem.id, elem.type) ? this.addValueToInputField(elem.id, elem.value, elem.type): this.appendHtmlFunction(elem.id,elem.value, elem.type)
					})
				}
				

			}).catch(err=> console.log(err))
	},
  created(){
    var scriptElement = document.getElementById('magic_app_script');
    var zapId = scriptElement.getAttribute('data-script-id')
		var location = window.location;
		var hostname = location.hostname;
		var queryParams = window.location.href.split('?')[1];
		var requestLocation  = location.protocol + '//' + location.host + location.pathname;

    var requestObj = {
      location : requestLocation,
      params: this.getAllParams(),
      zapId : zapId
		}	
			this.$http.get('https://freegeoip.net/json/').then(res=>{
				requestObj.params.clientId = res.body.ip;
				this.$http.post(this.postUrl,requestObj).then(function(data){
				if (data.body.appendUrls){
						var links = document.getElementsByTagName('a');
						for(var i = 0;i<links.length;i++){
							var oldhref = links[i].getAttribute('href');
							if (oldhref.indexOf('http')!==-1){

									if (oldhref.indexOf(hostname)!==-1){

										if(oldhref.indexOf('?') === -1){
												var newHref = oldhref +'?'+ queryParams;
												links[i].setAttribute('href',newHref);
										} else {
												var newHref = oldhref +'&'+ queryParams;
												links[i].setAttribute('href',newHref);
										}
									}

							} else {

									if(oldhref.indexOf('?') === -1){
										var newHref = oldhref +'?'+ queryParams;
										links[i].setAttribute('href',newHref);
									} else {
										var newHref = oldhref +'&'+ queryParams;
										links[i].setAttribute('href',newHref);
									}

							}   
						}
				}
			}).catch((err)=>{
					//console.error(err.body.message);
			})
		})
  },
  methods:{
		appendHtmlFunction(attributeName, attributeValue, attributeType){
			if (attributeType == 'name'){
				let elements = document.getElementsByName(attributeName);
						elements.forEach(element => {
							element.innerHTML = attributeValue
						})
			} else if (attributeType == 'id'){
				let elem = document.getElementById(attributeName);
				elem.innerHTML = attributeValue;
			}
		},
		addValueToInputField(attributeName,attributeValue, attributeType){
			if (attributeType == 'name'){
				let elements = document.getElementsByName(attributeName);
						elements.forEach(element => {
							element.value = attributeValue
						})
			} else if (attributeType == 'id'){
				let elem = document.getElementById(attributeName)
				elem && (elem.value = attributeValue)
			}
		},
		isElementIsInput(attributeName, attributeType){
			if (attributeType == 'name'){
				let elements = document.getElementsByName(attributeName);
						if (elements.length){
								return elements[0].tagName == 'INPUT' ? true : false ;
						}  else return false
			} else if(attributeType == 'id') {
				let elem = document.getElementById(attributeName);
				if (elem){
					return elem.tagName == 'INPUT' ? true : false ;
				} else return false
			}
		},
    getAllParams(url){
      // get query string from url (optional) or window
			  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

			  // we'll store the parameters here
			  var obj = {};

			  // if query string exists
			  if (queryString) {

			    // stuff after # is not part of query string, so get rid of it
			    queryString = queryString.split('#')[0];

			    // split our query string into its component parts
			    var arr = queryString.split('&');

			    for (var i=0; i<arr.length; i++) {
			      // separate the keys and the values
			      var a = arr[i].split('=');

			      // in case params look like: list[]=thing1&list[]=thing2
			      var paramNum = undefined;
			      var paramName = a[0].replace(/\[\d*\]/, function(v) {
			        paramNum = v.slice(1,-1);
			        return '';
			      });

			      // set parameter value (use 'true' if empty)
			      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

			      // (optional) keep case consistent
			      //paramName = paramName.toLowerCase();
			      //paramValue = paramValue.toLowerCase();

			      // if parameter name already exists
			      if (obj[paramName]) {
			        // convert value to array (if still string)
			        if (typeof obj[paramName] === 'string') {
			          obj[paramName] = [obj[paramName]];
			        }
			        // if no array index number specified...
			        if (typeof paramNum === 'undefined') {
			          // put the value on the end of the array
			          obj[paramName].push(paramValue);
			        }
			        // if array index number specified...
			        else {
			          // put the value at that index number
			          obj[paramName][paramNum] = decodeURIComponent(paramValue);
			        }
			      }
			      // if param name doesn't exist yet, set it
			      else {
			        obj[paramName] = decodeURIComponent(paramValue);
			      }
			    }
			  }

			  return obj;
    }
	}
}
</script>

<style>

</style>
