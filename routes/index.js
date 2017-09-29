var express = require('express');
var request = require('request');
var ip = require('ip');
var User = require('../database/schema');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({ live:true }, function(err, streams) { //mongo call User(database schema) find all streams that are live
    if (err){ //something went wrong
      console.log("error");
    }else{
      res.render('index', { stream: streams}); //render index view passing all the streams as an argument
                                              //streams is an array of json objects (JSONARRAY)
    }
});
});
router.get('/sendmsg',function(req,res,next){
  request.post("https://AC375edcf5add139df1fb3c4b3d48943d6:e56eaee02ce230889aa65f7e18e443a1@tadhack.restcomm.com/restcomm/2012-04-24/Accounts/AC375edcf5add139df1fb3c4b3d48943d6/SMS/Messages -d 'To=0034618227956' -d 'From=2B34911067304' -d 'Body=This is a test from RestComm'",function(error,response,body){
    res.send(response);
  });
});
/* GET watch page. */
router.get('/watch', function(req, res, next) {
  res.render('watch'); //render watch.ejs
});
/*GET register page*/
router.get('/register', function(req, res, next){
   res.render('register')
});

/* GET id from the user that is streaming */
router.get('/getstreamid',function(req,res,next){
  User.findOne({ name: 'popo' }, function(err, user) { //mongo call that get user information of an user
  if (err) res.send("0"); //if something went wrong 0
  else {
    if(user=="") res.send("0"); //if user doesnt exists 0
  }
  res.send(user.id); //send the id
});
});
/* GET that update stream to shut it down*/
router.get('/EndStream',function(req,res,next){
  User.findOneAndUpdate({ name: 'popo' }, { live: false}, function(err, user) { //mongo call find user and UPDATE him
  if (err) throw err;
  res.redirect('/'); //we redirect to our index main page just to close application flow
});
});
/* POST used to insert the stream id */
router.post('/InsertStreamid',function(req,res,next){
User.findOne({ name: 'popo' }, function(err, usere) { //mongo get information from the user
  var user = new User({
    name: 'popo', //user name
    id: req.body.id, //stream id
    room: req.body.room, //room where the stream is    /* JSON object use to insert in mongo*/
    live: true //naturally the user is streaming so TRUE
  });
if (usere==null){ //if user doesnt exists
  user.save(function(err) { //just save our JSON defined on lines 40-46
    if (err) throw err;
    res.send(req.body.room); //response just to test
  });
}else{
  User.findOneAndUpdate({ name: 'popo' }, /* Find user and update the new room new stream id and put live true*/
  { id: req.body.id,room:req.body.room,live:true }, function(err, user) {
  if (err) throw err;
  res.send("update...") //response just to test
});
}
});
});
module.exports = router;
