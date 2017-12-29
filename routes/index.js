var express = require('express');
var router = express.Router();
var UsersCtrl = require('../controllers/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/users/:id',UsersCtrl.getUserById);
router.post('/users',UsersCtrl.createUsers);
router.get




module.exports = router;
