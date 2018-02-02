var {getAllPlans} = require('../helpers/stripe');



function getAllPlansCtrl (req,res){
    getAllPlans()
        .then((plans)=>{
            res.status(200).send({status:true, message: 'success' , data : plans.data});
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).send({status:false, message : 'Whoops! something went wrong'})
        })
}


module.exports = {
    getAllPlansCtrl
}