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
  res.send(user);
});
});
router.post('/InsertStreamid',function(req,res,next){
var user = new User({
  name: 'gallo',
  id: req.body.id
});
User.findOneAndUpdate(
    {name: 'gallo'},
    {$set:{id:req.body.id}}, // find a document with that filter
    user, // document to insert when nothing was found
    {upsert: true, new: true, runValidators: true}, // options
    function (err, doc) { // callback
        if (err) {
          res.send(err)
        } else {
            res.send(doc);
        }
    }
);
});
module.exports = router;
