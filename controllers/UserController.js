var User = require('../models/User');
var passport = require('passport');
// var config = require('../config/passport')(passport);
var config = require('../config/dbConfig');
var jwt = require('jsonwebtoken');  


exports.register = function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter email and password.' });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        // Attempt to save the user
        newUser.save(function (err) {
            if (err) {
                return res.json({ success: false, message: 'That email address already exists.' });
            }
            res.json({ success: true, message: 'Successfully created new user.' });
        });
    }
};

exports.authenticate = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
        // Check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: 604800 // 1 week
                // expiresIn: 10080 // in seconds
            });
            res.json({ success: true, token: 'JWT ' + token });
            } else {
            res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
            }
        });
        }
    });
}