var User = require('../models/User');
var passport = require('passport');
// var config = require('../config/passport')(passport);
var config = require('../config/dbConfig');
var jwt = require('jsonwebtoken');  


exports.findAll = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.status(500).send({ message: "Some error ocuured while creating the User." })
        } else {
            res.send(users);
        }
    });
}

// Find a single user with a userId
exports.findOne = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve user with id " + req.params.userId });
        } else {
            res.send(user);
        }
    });
}

exports.delete = function(req, res) {
    User.remove({ _id: req.params.userId }, function(err, user) {
        if (err) {
            res.status(500).send({ message: "Could not delete user with id " + req.params.userId });
        } else {
            res.send({ message: "User deleted successfully!" });
        }
    });
}

exports.update = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.status(500).send({ message: "Could not find a user with id " + req.params.userId });
        }

        user.email = req.body.email;
        user.role = req.body.role;
        user.password = req.body.password;

        user.save(function (err, user) {
            if (err) {
                res.json({err: err});
                res.status(500).send({ message: "Could not update user with id " + req.params.userId });
            } else {
                res.send(user);
            }
        })
    });
};

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