var express = require('express');
var router = express.Router();
var app = express();
var passport = require('passport');
var users = require('../controllers/UserController');
require('../config/passport')(passport); // Bring in defined Passport Strategy

// Retrieve all users
router.get('/', users.findAll);

// Retrieve a single User with userId
router.get('/:userId', users.findOne);

// Create a new User
router.post('/register', users.register);

// Return a token to the user
router.post('/authenticate', users.authenticate);

// Update a User with userId
router.put('/:userId', users.update);

// Delete a User with userId
router.delete('/:userId', users.delete);

// Testing constraint only
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
  res.send('It worked! User id is: ' + req.user._id + '.');
});


module.exports = router;
