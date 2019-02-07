/**
 * OverAll Statistics Controller 
 * statisticsController.js
 * @description Controller for get all the statistics of the database
 */

const Users = require('../models/users');

async function getOverAllStats(){

    return new Promise(async (resolve, reject)=>{
         try {
             let totalUsers = await Users.aggregate(
                 {   $match : {} },
                 { 
                     $project : {
                         zaps : 1 ,
                         eachZapLength : {$size : "$zaps"},
                         totalPageViewCount : { $sum : "$zaps.pageViewCount"},
                         totalZapierTriggerCount : {$sum : "$zaps.zapierTriggerCount"}
                     }
                 },
                 {
                     $group : {
                         _id : null,
                         totalZapArr: { $push : '$eachZapLength'},
                         totalPageViewCountArr: {$push : '$totalPageViewCount'},
                         totalZapierTriggerCount: {$push : '$totalZapierTriggerCount'},
                         totalUsers : { $sum : 1}
                     }
                 },
                 {
                     $project : {
                         totalUsers : 1,
                         totalZaps : {
                             $reduce : {
                                 input : "$totalZapArr",
                                 initialValue: 0,
                                 in : {
                                     $add : ["$$value","$$this"]
                                 }
                             }
                         },
                         totalZapierTriggerCount: {
                             $reduce : {
                                 input : "$totalZapierTriggerCount",
                                 initialValue: 0,
                                 in : {
                                     $add : ["$$value","$$this"]
                                 }
                             }
                         },
                         totalPageViewCount: {
                             $reduce : {
                                 input : "$totalPageViewCountArr",
                                 initialValue: 0,
                                 in : {
                                     $add : ["$$value","$$this"]
                                 }
                             }
                         }
                     }
                 }
             );
             return resolve(totalUsers[0])
 
         } catch (error) {
             return resolve({})
         }
    })
 }
 
 
 /**
  * Function to get overall statistics
  * @param {object} req 
  * @param {object} res 
  */
 async function overAllStats(req, res){
     try {
         let data = await getOverAllStats()
         return res.status(200).json({message : 'ok', data : data, status : true});
 
     } catch (error) {
         return res.status(500).json({message : error.message, status : false});
     }
 }

 module.exports = {
    getOverAllStats,
    overAllStats
 }
 