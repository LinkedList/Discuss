var GoogleStrategy = require('passport-google').Strategy;
var passport = require('passport');
var properties = require('./properties');

var passportConfig = function(db) {
    passport.use(new GoogleStrategy({
        returnURL: properties.base + '/auth/google/return',
        realm: properties.base
    },
    function(identifier, profile, done) {
       var users = db.collection('users');

       users.findOne({googleId: identifier}, function (err, user) {
           if(err) {
               return done(err);
           }

           if(!user) {
               user = {
                   name: profile.displayName,
                   email: profile.emails[0].value,
                   googleId: identifier
               };

               users.save(user, function(err, user) {
                    if(err) console.log(err);
                    return done(err, user);
               });
           } else {
               return done(err, user);
           }
       });
    }));

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        done(null, user);
    });
};

module.exports = passportConfig;
