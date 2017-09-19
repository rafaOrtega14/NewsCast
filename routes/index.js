var express = require('express');
var User = require('../database/schema');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/watch', function(req, res, next) {
  res.render('watch');
});
router.get('/getstreamid',function(req,res,next){
  User.find({ name: 'gallo' }, function(err, user) {
  if (err) throw err;
  res.send(user.id);
});
});
router.post('/InsertStreamid',function(req,res,next){
var user = new User({
  name: 'gallo',
  id: req.body.id
});
User.update( { name : 'gallo' }, { id : req.body.id}, { upsert : true }, user );
});
module.exports = router;
