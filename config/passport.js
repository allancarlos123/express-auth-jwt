var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/User');
var config = require('./dbConfig');
var params = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    passport.use(new JwtStrategy(params, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};