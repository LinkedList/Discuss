/*jslint node: true */
"use strict";
var request = require('superagent');

var RANDOM_USER_API = "http://api.randomuser.me/";
var RANDOM_TEXT_API = "http://www.randomtext.me/api/gibberish/p-1/25-100";

var usersSeeder = function (callback, number) {
    var numberOfUsers = number || 1;
    request
        .get(RANDOM_USER_API)
        .query({results: number})
        .end(function(res){
            var users = res.body.results;

            var parsedUsers = [];

            users.forEach(function(user){
                parsedUsers.push(user.user);
            });

            callback(parsedUsers);
        });
};

var postSeeder = function (callback, user) {
    if(user === 'undefined') {
        throw new Error("Must supply user");
    }
    request
        .get(RANDOM_TEXT_API)
        .end(function(res){
            var post = {};
            var text_out = res.body.text_out.substr(3);
            post.text = text_out.substr(0, text_out.length - 5);
            post.user = user.name.first + " " + user.name.last;
            post.user_id = user._id;
            post.timestamp = new Date();

            callback(post);
        });
}

var randomPostSeeder = function (callback, users) {
    if(users === 'undefined' || users.length === 0) {
        throw new Error("Must supply users");
    }

    var user = users[Math.floor(Math.random()*users.length)];
    postSeeder(callback, user);
}

module.exports = {
    users: usersSeeder,
    post: postSeeder,
    randomPost: randomPostSeeder
};
