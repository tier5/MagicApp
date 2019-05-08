<template>
	<div id="app">
	</div>
</template>

<script>
export default {
	data () {
		return {
			postUrl: 'https://amagiczap.com/api/script-data',
			hostname: ''
		}
	},
	mounted(){
		// The whole process is for DOM Manipulation 
		let scriptElement = document.getElementById('magic_app_script');
		let zapId = scriptElement.getAttribute('data-script-id');
		this.$http.get(this.postUrl+'/'+ zapId).then(res=> {
			let attributes 			= res.body.attributes;
			let elementOption 	= res.body.elementOption;
			let cookieOption 		= res.body.cookieOption || false;
			// let cookie_url 			= this.$cookie.get('cache_url');
			let trueIdsandValue = []; // {id : name , value :'test'}

			if(!elementOption){
				return 
			};

			let queryParams 	= this.getQueryParams(cookieOption, attributes);
			let params = this.getAllParams(queryParams);

			if (attributes.length) {
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
		// The whole process is for sending data to api 
		// @todo Change Promise to Async Function for cleaner code base
		let scriptElement 		= document.getElementById('magic_app_script');
		let zapId 						= scriptElement.getAttribute('data-script-id');
		let location 					= window.location;
		this.hostname 				= location.hostname;
		let requestLocation  	= location.protocol + '//' + this.hostname + location.pathname;

		let requestObj = {
			location : requestLocation,
			params: {},
			zapId : zapId
		}

		this.$http.get('https://icanhazip.com').then((response)=>{
			let ip = response.body.trim();
			requestObj.params.clientId 	= ip;

			this.$http.get(this.postUrl+'/'+ zapId).then(res => {

				// condition checking to cache cooking if the backend flag is true
				let cookieOption 	= res.body.cookieOption || false;
				let timeoutOption = res.body.timeoutOption || false;
				let magicOption	  = res.body.magicOption || false;
				let days 					= res.body.timeout.days ? res.body.timeout.days : null;
				let hours 				= res.body.timeout.hours ? res.body.timeout.hours : null;
				let minutes 			= res.body.timeout.minutes ? res.body.timeout.minutes : null;

				let queryParams 	= this.getQueryParams(cookieOption, res.body.attributes);
				requestObj.params = this.getAllParams(queryParams);
				
				let timeout = {
					days: days,
					hours: hours, 
					minutes: minutes,
				};

				magicOption && this.appendUrlsToAllLinksInTheDom(queryParams);

				this.timeoutCheck({timeoutOption,timeout}).then(allowed => {
					if(allowed.isSendDataToZapier) {
						this.sendDataToApi(this.postUrl, requestObj);
					}
				});
			}).catch(err => {

			})
		}).catch(errorResp => {
			console.log('Error in getting ip');
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
		getQueryParams(cookieOption, attributes){
			
			let currentString = window.location.href.split('?')[1];
			let currentUrl 		= location.hostname;
			let queryString 	= '';

			if (cookieOption) {
				let currentDataInCookieUrl = this.$cookie.get('magic_cookie_url');
				if (currentDataInCookieUrl) {
					if(currentDataInCookieUrl == currentUrl && currentString) {
						let arr = currentString.split('&');
						
						for (let i=0; i<arr.length; i++) {
							// separate the keys and the values
							let a = arr[i].split('=');

							// in case params look like: list[]=thing1&list[]=thing2
							let paramNum = undefined;
							let paramName = a[0].replace(/\[\d*\]/, function(v) {
								paramNum = v.slice(1,-1);
								return '';
							});

							attributes.forEach(function(att, i) {
								if(att.attribute_name == paramName) {
									if (queryString !== '') {
										queryString = queryString+'&'+paramName+'='+a[1];
									} else {
										queryString = paramName+'='+a[1];
									}
								}
							})
						}
						if(queryString == ''){
							queryString = this.$cookie.get('magic_cookie_url_params');
						}
						
						this.$cookie.set('magic_cookie_url', currentUrl, 365);
						this.$cookie.set('magic_cookie_url_params', queryString, 365);
						
					} else if(currentDataInCookieUrl == currentUrl && !currentString) {
						queryString = this.$cookie.get('magic_cookie_url_params');
					}
				} else {
					this.$cookie.set('magic_cookie_url', currentUrl, 365);
					this.$cookie.set('magic_cookie_url_params', queryString, 365);
				}

			} else {
				queryString = currentString;
			}

			return queryString;
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
						if(oldhref.indexOf('#')===-1) {
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
		},
		setLastZapTime(){
			let dateTimeNow = this.$moment().toISOString();
			this.$cookie.set('_script_fire_on', dateTimeNow, 365);
		},
		timeoutCheck(obj){
			return new Promise((resolve,reject) => {
				let option = obj.timeoutOption;
				let time = obj.timeout;
				var now = this.$moment().toISOString();
				
				let lastInitiated = this.$cookie.get('_script_fire_on');
				// if the timeout flag is off sent data to api
				if (!option) { return resolve({isSendDataToZapier: true})}
				// if lastInitiated is null then also send data to api
				if (!lastInitiated) { return resolve({isSendDataToZapier: true})}
				
				let nextDate = this.$moment(lastInitiated);

				//Add days to the last initiated 
				if(time.days) {
					nextDate = nextDate.add(time.days, 'd');
				};
				
				// Add minutes to the last initiated
				if (time.minutes){ 
					nextDate = nextDate.add(time.minutes,'m');
				};

				// Add hours to the last initiated
				if(time.hours){
					nextDate = nextDate.add(time.hours,'h');
				}

				let checkNextFiringTime = nextDate.isBefore(now);
				if (!checkNextFiringTime){
					
					return resolve({isSendDataToZapier: false})
				} else {
					
					return resolve({isSendDataToZapier: true})
				}
				
			})
		},
		sendDataToApi(postUrl, postData){
			this.$http.post(postUrl,postData)
					.then(function(data) {
							this.setLastZapTime();
					}).catch(err=> {})
		},
		getAllParams (queryParams) {
			// get query string from url (optional) or window
			var queryString = queryParams;

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
						} else {// if array index number specified...
							// put the value at that index number
							obj[paramName][paramNum] = decodeURIComponent(paramValue);
						}
					} else { // if param name doesn't exist yet, set it
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


