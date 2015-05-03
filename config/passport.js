var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
var properties = require('./properties');
var ObjectId = require('mongojs').ObjectId;

var passportConfig = function(db) {
    var users = db.collection('users');
    passport.use(new GoogleStrategy({
        clientID: properties.gId,
        clientSecret: properties.gSec,
        callbackURL: properties.base + '/auth/google/return',
    },
    function(accessToken, refreshToken, profile, done) {

       users.findOne({googleId: profile.id}, function (err, user) {
           if(err) {
               return done(err);
           }

           if(!user) {
               var icon = profile.photos === undefined ? "/img/default_user.png" : profile.photos[0];
               user = {
                   name: {
                       first: profile.name.givenName,
                       last: profile.name.familyName
                   },
                   picture: {
                       thumbnail: icon
                   },
                   email: profile.emails[0].value,
                   googleId: profile.id
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
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done){
        users.findOne({_id: ObjectId(_id)}, function (err, user) {
            done(err, user);
        });
    });
};

module.exports = passportConfig;
