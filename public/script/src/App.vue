<template>
  <div id="app">
		
  </div>
</template>

<script>
export default {
  data () {
    return {
			postUrl: 'http://localhost:3000/api/script-data',
			hostname:''
    }
  },
	mounted(){
		var scriptElement = document.getElementById('magic_app_script');
		var zapId = scriptElement.getAttribute('data-script-id');
		var elements = document.getElementById('gender');
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
						let tagName = this.getElementTagName(elem.id,elem.type);
						switch(tagName){
							case "INPUT":
								this.addValueToInputField(elem.id, elem.value, elem.type)
								break;
							case "SELECT" :
								this.addValueToSelectField(elem.id, elem.value, elem.type)
								break;
							case "SPAN":
								this.appendHtmlFunction(elem.id,elem.value, elem.type)
								break;
							case "TEXTAREA":
								this.addValueToTextArea(elem.id, elem.value, elem.type)
								break;
							case false :
								//console.log('tagnotfound!');
								break;
							default :
								//console.log(tagName);
						}
					})
				}
				

			}).catch(err=> console.log(err))
	},
  created(){
    	var scriptElement = document.getElementById('magic_app_script');
    	var zapId = scriptElement.getAttribute('data-script-id')
		var location = window.location;
		this.hostname = location.hostname;
		var queryParams = window.location.href.split('?')[1];
		var requestLocation  = location.protocol + '//' + location.host + location.pathname;
		var requestObj = {
			location : requestLocation,
			params: this.getAllParams(),
			zapId : zapId
		}
		// IP tracking of the client
		this.$http.get('http://icanhazip.com').then((response)=>{
				
				let ip = response.body.trim();
				
				requestObj.params.clientId = ip;
				
				this.$http.post(this.postUrl,requestObj)
					.then(function(data){
						// cached url
						this.addUrlToCookie();
						
						if (data.body.appendUrls){
								// append the url to the anchor tag
								this.appendUrlsToAllLinksInTheDom(queryParams)
						}
					}).catch((err)=> {
						
						let url = this.$cookie.get('cache_url');
						// bad request
						if (err.status === 400 && url) {
							
							/**
							 * Logic When cookieFlag is true then take user's cached data and send to APP
							 * Process Request for the cookieFlag and if true then send the cached data to app
							 */
							
							this.$http.get(this.postUrl+'/'+ zapId).then(res=> {
								// condition checking to chache cooking if the backend flag is true is the creator
								let cookieOption = res.body.cookieOption || false;
								// if the cookieOption is ON
								if (cookieOption) {
									// take cached url from cookie
									let cacheParams = this.getAllParams(url)
									requestObj.params = cacheParams ;
									requestObj.params.clientId = ip;
									// resend the data to app
									this.$http.post(this.postUrl,requestObj).then(function(data) {
											if (data.body.appendUrls) {
												// if appendUrls is true then add the cached url to the dom
												queryParams = url.split('?')[1]
												this.appendUrlsToAllLinksInTheDom(queryParams)
										}
									})
								}
							})
						}
				
			})
		});
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
							if (element.type==='text' || element.type ==='email' || element.type==='password'){
									element.value = attributeValue
							} else if (element.type ==='radio' || element.type ==='checkbox'){
								
								if (element.value == attributeValue){
									element.checked = true
								}
							}
							
						})
			} else if (attributeType == 'id'){
				let element = document.getElementById(attributeName)
				if (element.type==='text' || element.type === 'email' || element.type==='password'){
						element.value = attributeValue
				} else if (element.type ==='radio' || element.type ==='checkbox'){
					if (element.value == attributeValue){
								element.checked = true
					}
				}
			}
		},
		addValueToSelectField(attributeName,attributeValue, attributeType){

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
		getElementTagName(attributeName,attributeType){
			if (attributeType == 'name'){
				let elements = document.getElementsByName(attributeName);
						if (elements.length){
								return elements[0].tagName
						} else return false
			} else if(attributeType == 'id') {
				let elem = document.getElementById(attributeName);
				if (elem){
					return elem.tagName;
				} else return false
			}
		},
		addValueToTextArea(attributeName, attributeValue ,attributeType){
			if (attributeType == 'name'){
				let elements = document.getElementsByName(attributeName);
						elements.forEach(element => {
							element.value = attributeValue
						})
			} else if (attributeType == 'id'){
				let elem = document.getElementById(attributeName);
				elem && (elem.value = attributeValue)
			}
		},
		addUrlToCookie(){
			let url = window.location.href
			this.$cookie.set('cache_url', url, 365);
		},
		appendUrlsToAllLinksInTheDom(queryParams) {
			var links = document.getElementsByTagName('a');
			for(var i = 0;i<links.length;i++){
				var oldhref = links[i].getAttribute('href');
				if (oldhref.indexOf('http')!==-1){

						if (oldhref.indexOf(this.hostname)!==-1){

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
