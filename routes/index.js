var express = require('express');
var User = require('database/schema');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/watch', function(req, res, next) {
  res.render('watch');
});
router.post('/InsertStreamid',function(req,res,next){
var user = new User({
  name: 'rafita',
  id: req.body.id
});
user.dudify(function(err, name) {
  if (err) throw err;
  res.send(name)
});
user.save(function(err) {
  if (err) throw err;

});

});
module.exports = router;
