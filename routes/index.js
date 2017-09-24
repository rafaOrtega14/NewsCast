var express = require('express');
var User = require('../database/schema');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  User.find({ live:true }, function(err, info) {
    var bla={};
    if (err){
      console.log("error");
    }else{
      var ninf = {
     name: 'default',
     room:"252432345",
     live: true
   };
   if(info==null){
       bla=ninf;
   }else{
     bla=info;
   }
    }
res.render('index', { stream: bla});
});

});
router.post('/hola',function(req,res,next){
  if (req.body.palabra == "guau") res.send("hola")
  res.send(req.body.palabra)
});
router.get('/watch', function(req, res, next) {
  res.render('watch');
});
router.get('/getstreamid',function(req,res,next){
  User.findOne({ name: 'pepo' }, function(err, user) {
  if (err) res.send("0");
  else {
    if(user=="") res.send("0");
  }
  res.send(user.id);
});
});
router.get('/EndStream',function(req,res,next){
  User.findOneAndUpdate({ name: 'pepo' }, { live: false}, function(err, user) {
  if (err) throw err;
  res.send("update...")
});
});
router.post('/InsertStreamid',function(req,res,next){

User.findOne({ name: 'pepo' }, function(err, usere) {
  var user = new User({
    name: 'popo',
    id: req.body.id,
    room: req.query.room,
    live: true
  });
if (usere==null){
  user.save(function(err) {
    if (err) throw err;
    res.send(req.query.room);
  });
}else{
  User.findOneAndUpdate({ name: 'pepo' }, { id: req.body.id,room:req.query.room,live:true }, function(err, user) {
  if (err) throw err;
  res.send("update...")
});
}
});
});
module.exports = router;
