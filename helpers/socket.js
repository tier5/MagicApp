/**
 * Helper function to implement socket IO
 * 
 */
 var {getOverAllStats} = require('../controllers/statisticsController');
 var IO_GLOBAL = null;

 /**
  * Initiate The Socket
  * @param {object} IO 
  */
 function socketHelperFunction(IO) {
    IO_GLOBAL = IO;
    IO.on('connection', (socket)=>{
        //console.log('New user connected' , socket.id);
    
        socket.on('disconnect', ()=> {
            //console.log(socket.id);
        })

        socket.on('join', (data)=>{
            if (data && data.user){
                //console.log('in join ', data);
                socket.join(data.user);
            }
        })
     });
 }

 /**
  * This function send message to the client to refresh the 
  * @param {object} user 
  */
 function sendRefreshStats(user){ 
    var userEmail = user.email;
    IO_GLOBAL.sockets.in(userEmail).emit('refresh-stats', {});
 }

 async function emitTotalDataStatistics(){
    try {
        let data = await getOverAllStats();
        IO_GLOBAL.sockets.emit('overall-stats', data);
    } catch (error) {
        IO_GLOBAL.sockets.emit('overall-stats', {});
    }
     
 }

 module.exports = {
    socketHelperFunction,
    sendRefreshStats,
    emitTotalDataStatistics
 }

