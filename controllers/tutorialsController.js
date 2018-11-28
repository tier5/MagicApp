/**
 * Name: tutorialsController.js
 * Purpose :  a tutorials controller
 */

 let Tutorials = require('../models/tutorials');
 let _ = require('lodash');
 var validUrl = require('valid-url');


 /**
  * Funtion to create tutorials
  * @param {object} req 
  * @param {object} res 
  * @param {object} next 
  */
 function createTutorial(req,res,next){
     let body = req.body;

     if (!validUrl.isUri(body.source)){
        return res.status(400).send({message : 'Invalid source', status : false , data: {}})
     } 
     let newTutorial = new Tutorials(body);
     newTutorial.save().then(docs => {
        return res.status(200).send({message : 'New Tutorial Created', status: true, data : body });
     }).catch(error => {

        if (error.code === 11000){
            return res.status(400).send({message : 'Order Number already exist', status : false , data: {}}); 
        }

        if (error.name === 'ValidationError') {
            return res.status(400).send({message : 'Invalid data', status : false , data: {}}) 
        }

        return res.status(500).send({message : 'Something Went Wrong!', status : false , data: {}, error : error})
     });
 }

/**
 * Function to get all the Tutorials
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
 function getAllTutorials(req, res, next) {

    Tutorials.find().select({title : 1, description: 1, source: 1, order: 1}).then(docs=>{
        return res.status(200).send({message : 'Updated', status: true, data : docs });
    }).catch(error=> {
        return res.status(500).send({message : 'Something Went Wrong!', status : false , data: {}, error : error})
    });

 }
/**
 * Function to get a Tutorial by Id
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
 function getTutotialById(req,res,next){
    Tutorials
        .findById(req.params.id)
        .select({title : 1, description: 1, source: 1, order: 1})
        .then(docs => {
            if (!docs){ return res.status(404).send({message : 'Not Found!', status: false , data: {}})};
            return res.status(200).send({message : 'Updated', status: true, data : docs });
        }).catch(error => {
            return res.status(500).send({message : 'Something Went Wrong!', status : false , data: {}, error : error})
        })
 }
/**
 * Function to update a tutorial
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
 function updateTutorials(req, res, next){
     var id = req.params.id;
     if (!validUrl.isUri(req.body.source)){
        return res.status(400).send({message : 'Invalid source', status : false , data: {}})
     } 
     Tutorials.findById(id).then(docs => {
         if (!docs){ return res.status(404).send({message : 'Not Found!', status: false, data: {}})};
         var data = req.body;
         var conditions = { _id: id};
         var update = data
         var options = { multi: false , upsert : false};

         Tutorials.updateOne(conditions, update, options).then((updated)=> {
             if (updated.n == 1){
                return res.status(200).send({message : 'Updated', status: true, data : {} });
             } else {
                return res.status(200).send({message : 'Not Updated', status: true, data: {}});
             }
         }).catch(error => {
            if (error.code === 11000){
                return res.status(400).send({message : 'Order Number already exist', status : false , data: {}}); 
            }
    
            if (error.name === 'ValidationError') {
                return res.status(400).send({message : 'Invalid data', status : false , data: {}}) 
            }
    
            return res.status(500).send({message : 'Something Went Wrong!', status : false , data: {}, error : error})
         });
     }).catch(error=>{
         return res.status(500).send({message : 'Something Went Wrong!', status : false , data: {}, error : error})
     });
 }
/**
 * Function to delete Tutorial
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
 function deleteTutorial(req, res, next){
    var id = req.params.id;
    Tutorials.findByIdAndRemove(id).then(docs => {
        if(!docs) { return res.status(404).send({message : 'Not Found!', status: false, data: {}}); }
        return res.status(200).send({message : 'Tutorial deleted', status: true, data: docs})
    }).catch(error => {
        return res.status(500).send({message : 'Something Went Wrong!', status : false , data: {}, error : error})
    })
 }




 module.exports = {
    createTutorial,
    getAllTutorials,
    getTutotialById,
    updateTutorials,
    deleteTutorial
 }