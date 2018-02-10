var express = require('express');
var router = express.Router();
var app = express();
var passport = require('passport');
var users = require('../controllers/UserController');

// Bring in defined Passport Strategy
require('../config/passport')(passport);  

// GET users listing.
router.get('/', users.findAll);

// Register new users
router.post('/register', users.register);

router.post('/authenticate', users.authenticate);

router.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
  res.send('It worked! User id is: ' + req.user._id + '.');
});


module.exports = router;
