/*jslint node: true */
"use strict";
var request = require('superagent');

var RANDOM_USER_API = "http://api.randomuser.me/";
var RANDOM_TEXT_API = "http://www.randomtext.me/api/gibberish/p-1/25-100";

var seeder = {
    users: function (callback, number) {
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
    }
};

module.exports = seeder;
