
 //var constants= require("../config.json");
 const passport=require('passport');
 var JwtStrategy = require('passport-jwt').Strategy,
     ExtractJwt = require('passport-jwt').ExtractJwt;
// 'use strict';

var loginpage = require('../src/models/login');
var config = require('./settings');

// Setup work and export for the JWT passport strategy
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret_key
};
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("JWT Payload:", jwt_payload);
   loginpage.findOne({ emailid: jwt_payload.emailid }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            delete user.password;
            console.log("Authentication valid");
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = passport;

