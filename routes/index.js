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
  User.find({ name: 'rafitase' }, function(err, user) {
  if (err) throw err;
  res.send(user);
});
});
router.post('/InsertStreamid',function(req,res,next){
var user = new User({
  name: 'gallo',
  id: req.body.id
});
user.update(
    {tweet_id: req.body.id,
    {$setOnInsert: user},
    {upsert: true},
    function(err, numAffected) {
      res.send(numAffected);
     }
);
});
module.exports = router;
