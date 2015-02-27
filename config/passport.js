var GoogleStrategy = require('passport-google').Strategy;
var passport = require('passport');
var properties = require('./properties');
var ObjectId = require('mongojs').ObjectId;

var passportConfig = function(db) {
    var users = db.collection('users');
    passport.use(new GoogleStrategy({
        returnURL: properties.base + '/auth/google/return',
        realm: properties.base
    },
    function(identifier, profile, done) {

       users.findOne({googleId: identifier}, function (err, user) {
           if(err) {
               return done(err);
           }

           if(!user) {
               user = {
                   name: {
                       first: profile.name.givenName,
                       last: profile.name.familyName
                   },
                   email: profile.emails[0].value,
                   googleId: identifier
               };

               console.log(profile);

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
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done){
        users.findOne({_id: ObjectId(_id)}, function (err, user) {
            done(err, user);
        });
    });
};

module.exports = passportConfig;
