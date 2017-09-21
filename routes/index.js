var express = require('express');
var User = require('../database/schema');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findOne({ name: 'pepa' }, function(err, info) {
    if (err) console.log("error");
  res.render('index', { stream: info});
});

});
router.get('/watch', function(req, res, next) {
  res.render('watch');
});
router.get('/getstreamid',function(req,res,next){
  User.findOne({ name: 'pepa' }, function(err, user) {
  if (err) res.send("0");
  res.send(user.id);
});
});
router.post('/InsertStreamid',function(req,res,next){

User.findOne({ name: 'pepa' }, function(err, usere) {
  var user = new User({
    name: 'pepa',
    id: req.body.id,
    room: req.body.room
  });
if (usere==null){
  user.save(function(err) {
    if (err) throw err;
    res.send("insert...");
  });
}else{
  User.findOneAndUpdate({ name: 'pepa' }, { id: req.body.id }, function(err, user) {
  if (err) throw err;
  res.send("update...")
});
}
});
});
module.exports = router;
