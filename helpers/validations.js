
// validate all params exists or not 

function isAllParamsExists (zap_params,script_params){

    return new Promise(function(resolve,reject){
       var paramsFound = []
       zap_params.forEach(element => {
       var prp = element.field_name
       var prp_val = element.field_value
       var valiTy= element.validationType
       for (const prop in script_params) {
           if (prp === prop ){
           // console.log('found');
           paramsFound.push(prp);
           break
           }
       }
       });
       //console.log(paramsFound)
       if(paramsFound.length == zap_params.length){

           resolve()
       } else{
           reject()
       }
   })
};

function isAllValidationPassed(zap_params,script_params){
 return new Promise(function(resolve,reject){
    var flag = true;
    zap_params.forEach(element => {
        var prp = element.field_name
        var prp_val = element.field_value
        var valiTy= element.validationType
        for (const prop in script_params) {
          if (prp === prop ){
            switch (valiTy) {
              case 'Exists':
                flag = true
                break;
              case '=':
                if(prp_val == script_params[prop]){
                  break
                } else {
                  flag = false
                  break
                }
              case '!=':
                if(prp_val != script_params[prop]){
                  break
                } else{
                  flag = false
                  break
                }
            }
        
          } else {
            //console.log('not found')
          }
        }      
      });
  
      if (flag ){
        console.log('test passed');
        resolve()
      } else {
        console.log('test failed');
        reject()
      }
 })   
}
module.exports = {
    isAllParamsExists,
    isAllValidationPassed
}


