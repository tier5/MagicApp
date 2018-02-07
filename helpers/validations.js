/**
 * Name : validation.js
 * Purpose : Validation of the script data coming from script pasted in some website or web application
 */

/**
 * Function for validation of all the parameters are present in the script data sent to the application
 * @param {object} zap_params 
 * @param {object} script_params
 * @returns Promise 
 */
function isAllParamsExists (zap_params,script_params){
    return new Promise(function(resolve,reject){
        var paramsFound = []
        zap_params.forEach(element => {
            var prp = element.field_name;
            var prp_val = element.field_value;
            var valiTy= element.validationType;
            for (const prop in script_params) {
                if (prp === prop ){
                // console.log('found');
                    paramsFound.push(prp);
                    break
                }
            }
        });
        if(paramsFound.length == zap_params.length){
            resolve()
        } else {
            reject({message:'All params not exists'});
        }
    })
};
/**
 * Function to check the validation which are present in zap params are valid in script params
 * @param {*} zap_params 
 * @param {*} script_params 
 * @returns Promise
 */
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
                            } else {
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
            resolve()
        } else {
            reject({message:'params validation failed'});
        }
    })   
}

module.exports = {
    isAllParamsExists,
    isAllValidationPassed
}


