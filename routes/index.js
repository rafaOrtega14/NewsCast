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
  User.findOne({ name: 'pepe' }, function(err, user) {
  if (err) throw err;
  res.send(user.id);
});
});
router.post('/InsertStreamid',function(req,res,next){

User.findOne({ name: 'pepe' }, function(err, usere) {
  var user = new User({
    name: 'pepe',
    id: req.body.id
  });
if (usere==null){
  user.save(function(err) {
    if (err) throw err;
    res.send("insert...");
  });
}else{
  User.findOneAndUpdate({ name: 'pepe' }, { id: req.body.id }, function(err, user) {
  if (err) throw err;
  res.send("update...")
});
}
});
});
module.exports = router;
