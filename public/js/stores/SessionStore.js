/* jshint node: true */
"use strict";
var Reflux = require('reflux');
var request = require('superagent');
var SessionActions = require('../actions/SessionActions');

var SessionStore = Reflux.createStore({
	listenables: [SessionActions],

	init: function () {
		this.user = {};
	},

	onGetUser: function (name) {
		var _this = this;
		request
			.get('/user')
			.end(function(err, res){
				if(err) {
					console.error(err);
					return;
				}

				_this.user = !res.body ? _this.getEmptyUser(): res.body;
				_this.trigger(_this.user);
			});
	},

	current: function() {
		return this.user;
	},

	getEmptyUser: function () {
		return {
				_id: null,
				name: {first: "", last: ""},
				picture: {
					thumbnail: "#"
				}
			};
	}

});

module.exports = SessionStore;
