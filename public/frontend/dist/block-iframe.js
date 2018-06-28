(function(){
  /**
   * Get api url from script data
   * @type {HTMLElement}
   */
  var script = document.getElementById('block-iframe');
  var _apiUrl =  script.getAttribute("data-domain_api");
  /**
   * Ajax function to call a api
   * @type {{xhr: null, request: request}}
   */
  var Ajax = {
    xhr : null,
    request : function (url,method, data,success,failure){
      if (!this.xhr){
        this.xhr = window.ActiveX ? new ActiveXObject("Microsoft.XMLHTTP"): new XMLHttpRequest();
      }
      var self = this.xhr;

      self.onreadystatechange = function () {
        if (self.readyState === 4 && self.status === 200){
          // the request is complete, parse data and call callback
          var response = JSON.parse(self.responseText);
          success(response);
        }else if (self.readyState === 4) { // something went wrong but complete
          console.log(self.responseText);
          failure();
        }
      };
      this.xhr.open(method,url,true);
      this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      this.xhr.send(data);
    },
  };
  /**
   * Ajax call to get the server status and block the frame element
   */
  Ajax.request(_apiUrl,"GET",null,function(data){
       if (data.status) {
         var frames = window.frameElement;
         if (frames) {
           frames.src = '';
         }
       }
   });

})();
